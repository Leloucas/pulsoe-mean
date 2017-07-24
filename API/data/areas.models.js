var mongoose = require('mongoose');

var categoriaSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  descripcion : {
    type : String,
    default : ''
  },
  createdOn : {
    type : Date,
    default : Date.now
  }
});

var areaSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  descripcion : {
    type : String,
    default : ''
  },
  categorias : [categoriaSchema],
  createdOn : {
    type : Date,
    default : Date.now
  },
  deletedAt : {
    type : Date,
    default : ''
  }
});

mongoose.model('Area', areaSchema, 'areas');
