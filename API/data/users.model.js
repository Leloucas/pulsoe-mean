var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var usuarioDatosSchema = new mongoose.Schema({
  fechaNacimiento : Date,
  sexo : String,
  imagen : {
    type : String,
    default : ''
  },
  estadoCivil : String,
  celular : String,
  telefono : String,
  location : {
    direccion : String,
    coordenadas : {
      type : [Number], //lon, lat
      index : '2dsphere'
    },
    zip : Number,
    colonia : String,
    pais : String,
    estado : String,
    ciudad : String
  },
  nacionalidad : String,
  discapacidad : {
    type : String,
    default : ''
  },
  facebook : {
    type : String,
    default : ''
  },
  twitter : {
    type : String,
    default : ''
  },
  linkedIn : {
    type : String,
    default : ''
  },
  licenciaConducir : Boolean,
  vehiculoPropio : Boolean
});

var usuarioExperienciaSchema = new mongoose.Schema({
  nombre : String,
  giroEmpresa : String,
  puesto : String,
  area : String,
  fechaInicio : Date,
  fechaFinal : {
    type : Date,
    default : ''
  },
  descripcion : String,
  sueldo : {
    cantidad : Number,
    periodo : String,
  }
});

var usuarioFormacionSchema = new mongoose.Schema({
  centroEducativo : String,
  nivel : String,
  estado : String,
  fechaInicio : Date,
  fechaFinal : {
    type : Date,
    default : ''
  }
});

var usuarioSoftwareSchema = new mongoose.Schema({
  software : String,
  nivel : String
});

var usuarioIdiomaSchema = new mongoose.Schema({
  idioma : String,
  conversacion : String,
  lectura : String,
  redaccion : String
});

var usuarioCapacitacionSchema = new mongoose.Schema({
  evento : String,
  area : String,
  descripcion : String,
});

var userSchema = new mongoose.Schema({
  email : {
    type: String,
    unique : true,
    required : true,
  },
  name : {
    type : String,
    required : true
  },
  lastname : {
    type : String,
    required : true
  },
  level : {
    type : String,
    default : 'user'
  },
  hash : String,
  salt : String,
  data : usuarioDatosSchema,
  experience : [usuarioExperienciaSchema],
  schooling : usuarioFormacionSchema,
  software : [usuarioSoftwareSchema],
  languages : [usuarioIdiomaSchema],
  courses : [usuarioCapacitacionSchema],
  values : [String],
  skills : String,
  salary : {
    sueldo : Number,
    periodo : String
  },
  position : [String],
  areas : [String],
  registered : {
    type : Boolean,
    default : false
  },
  vacantes : [{ type: Schema.Types.ObjectId, ref: 'Vacante' }],
  createdOn : {
    type : Date,
    default : Date.now
  },
  deletedOn : {
    type : Date,
    default : ''
  }
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  try {
    var imagen = this.data.imagen;
  } catch(e) {
    var imagen = null;
  }

  console.log(imagen, "imagen");

  return jwt.sign({
    _id : this._id,
    email : this.email,
    name : this.name,
    lastname : this.lastname,
    level : this.level,
    registered : this.registered,
    avatar : imagen,
    exp : parseInt(expiry.getTime() / 1000),
  }, process.env.JWTKey);
};

mongoose.model('User', userSchema);
