var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var infoAdicionalSchema = new mongoose.Schema({
//   exp : Number, // años de exp
//   edad : Number,
//   estudios : String,
//   idiomas : {
//     idioma : String,
//     nivel : String
//   },
//   software : {
//     software : String,
//     nivel : String,
//   },
//   licenciaConducir : Boolean,
//   dispViajar : Boolean,
//   dispCambio : Boolean
// });

var vacanteSchema =  new mongoose.Schema({
  puesto : {
    type : String,
    required : true
  },
  area : { type: Schema.Types.ObjectId, ref: 'Area' },
  categoria : {
    name: String,
    _id: Schema.Types.ObjectId
  },
  autor : { type: Schema.Types.ObjectId, ref: 'User' },
  descripcion : {
    type : String,
    default : ''
  },
  pais : String,
  estado : String,
  ciudad : String,
  jornada : {
    horas : Number,
    turno : String
  },
  tipoContrato : String,
  salario : {
    cantidad : Number,
    periodo : String,
    default : ''
  },
  fechaContrato : {
    type : Date,
    default : ''
  },
  experiencia : {
    cantidad : Number,
    periodo : String,
    default : ''
  },
  edadMin : {
    type : Number,
    default : 16
  },
  edadMax : {
    type : Number,
    default : ''
  },
  escolaridad : {
    grado : String,
    titulo : {
      type : String,
      default : ''
    },
  },
  idioma : [{
    idioma : String,
    conversacion : String,
    lectura : String,
    redaccion : String,
    _id : {id:false}
  }],
  software : [{
    software : String,
    nivel : String,
    _id : {id:false}
  }],
  imagen : {
    type : String,
    default : ''
  },
  users : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  views : Number,
  createdOn : {
    type : Date,
    default : Date.now
  },
  deletedAt : {
    type : Date,
    default : ''
  }
});

mongoose.model('Vacante', vacanteSchema);
