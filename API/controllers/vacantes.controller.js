var mongoose = require('mongoose');
var Vacante = mongoose.model('Vacante');
var multer = require('multer');
var User = mongoose.model('User');
var Area = mongoose.model('Area');

//multers disk storage settings
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/vacantes/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null,
          // file.fieldname +
          'vacante-' + datetimestamp +
          randomString(3) + '.' +
          file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
  storage: storage,
  fileFilter: function (req, file, cb) {
      var ext = file.originalname.split('.')[file.originalname.split('.').length -1];
      if(ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg') {
          return cb({
            code: 'FILE_EXT', message:'Only images are allowed'
          });
      }
      cb(null, true)
  },
  limits : { fileSize : 2000000} //bytes
}).single('file');

function randomString(len){
    var text = "";

    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < len; i+=1 ){
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
}

module.exports.vacantesGetAll = function(req, res){
  console.log("GET all vacantes");
  console.log(req.query);

  var count = 100;
  var offset = 0;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }

  if(isNaN(offset) || isNaN(count)){
    res
      .status(400)
      .json({
        "message" : "Los datos enviados en el query deben ser números"
      });
    return;
  }

  Vacante
    .find()
    .populate('area', '_id name')
    .populate('autor', '_id name lastname')
    .skip(offset)
    .limit(count)
    .exec(function(err, vacantes){
      if (err) {
        console.log("Error finding vacantes");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found vacantes", vacantes.length)
        res
          .status(200)
          .json(vacantes);
      }
    })
};

module.exports.vacantesSaveOne = function(req, res){
  console.log(req);
  if (!req.payload._id) {
    res
      .status(401)
      .json({
        "message" : "UnauthorizedError: private profile"
      });
  } else {
    upload(req,res,function(err){
        if(err){
             res
              .status(500)
              .json(err);
        } else {
          // console.log(req, req.file);
          _addVacante(req, res);
              //  res
              //   .status(200)
              //   .json(err);
        }
    });
  }
};

var _addVacante = function(req, res) {

  console.log(req.file,"here it is");
  var vacante = req.body.vacante;

  console.log(vacante,'got this');

  var filename = '';
  if(req.file){
    filename = req.file.filename;
  }

  // var idiomas = [];
  // for (var i = 0; i < vacante.idioma.length; i += 1) {
  //   idiomas.push({
  //     idioma : vacante.idioma[i].idioma,
  //     conversacion : vacante.idioma[i].conversacion,
  //     lectura : vacante.idioma[i].lectura,
  //     redaccion : vacante.idioma[i].redaccion
  //   });
  // }
  //
  // var softwares = [];
  // for (var i = 0; i < vacante.software.length; i += 1) {
  //   softwares.push({
  //     software : vacante.software[i].software,
  //     nivel : vacante.software[i].nivel
  //   });
  // }

  Vacante
    .create({
      puesto : vacante.puesto,
      area : vacante.area,
      categoria : {
        name : vacante.categoria.name,
        _id : vacante.categoria._id
      },
      autor : req.payload._id,
      descripcion : vacante.descripcion,
      pais : vacante.pais,
      estado : vacante.estado,
      ciudad : vacante.ciudad,
      jornada : {
        horas : parseInt(vacante.jornada.horas, 10),
        turno : vacante.jornada.turno
      },
      tipoContrato : vacante.tipoContrato,
      salario : {
        cantidad : parseFloat(vacante.salario.cantidad),
        periodo : vacante.salario.periodo
      },
      fechaContrato : vacante.fechaContrato,
      experiencia : {
        cantidad : parseInt(vacante.experiencia.cantidad),
        periodo : vacante.experiencia.periodo
      },
      edadMin : parseInt(vacante.edadMin),
      edadMax : parseInt(vacante.edadMax),
      escolaridad : {
        grado : vacante.escolaridad.grado,
        titulo : vacante.escolaridad.titulo
      },
      idioma : vacante.idioma,
      software : vacante.software,
      imagen : filename
    }, function(err, newVacante){
      if(err){
        console.log("Error creating Vacante");
        res
          .status(400)
          .json(err);
      } else {
        console.log(newVacante, "Vacante created")
        res
          .status(201)
          .json(newVacante);
      }
    });
    // res.status(200).json();
};
