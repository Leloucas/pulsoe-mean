var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var infoAdicionalSchema = new mongoose.Schema({
  exp : Number, // años de exp
  edad : Number,
  estudios : String,
  idiomas : {
    idioma : String,
    nivel : String
  },
  software : {
    software : String,
    nivel : String,
  },
  licenciaConducir : Boolean,
  dispViajar : Boolean,
  dispCambio : Boolean
});

var vacanteSchema =  new mongoose.Schema({
  titulo : String,
  subtitulo : {
    type : String,
    default : ""
  },
  area : String,
  descripcion : String,
  pais : String,
  estado : String,
  ciudad : String,
  jornada : String,
  contrato : String,
  salario : {
    type : Number,
    default : ""
  },
  fechaContrato : {
    type : Date,
    default : ""
  },
  cantidad : Number, // de personas que se requieren
  visitas : Number,
  adicional : [infoAdicionalSchema]
});

mongoose.model('Vacante', vacanteSchema);
