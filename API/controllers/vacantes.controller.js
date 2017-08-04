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

  var count = '';
  var offset = 0;
  var area = '';

  var Query = Vacante
    .find();

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
    Query.skip(offset);
  }

  if(req.query && req.query.puesto){
    var puesto = req.query.puesto;
    puesto = decodeURI(puesto);
    puesto = puesto.toLowerCase();
    Query.where('puesto').equals( {$regex : new RegExp(puesto), $options: "i"})
  }

  if(req.query && req.query.count){
    count = parseInt(req.query.count, 10);
    Query.limit(count);
  }

  if(req.query && req.query.autor){
    var autor = req.query.autor;
    Query.populate('autor', '_id name lastname');
    Query.where('autor').in([autor]);
  } else {
    Query.populate('autor', '_id name lastname');
  }

  if (req.query && req.query.area) {
    var area = req.query.area;
    Query.populate('area', '_id name');
    Query.where('area').in([area]);
  } else {
    Query.populate('area', '_id name');
  }

  if(req.query && req.query.pais){
    var pais = req.query.pais;
    pais = decodeURI(pais);
    pais = pais.replace(/\s|\W|[#$^&*()]/g, "");
    Query.where('pais').equals(pais);
  }

  if(req.query && req.query.estado){
    var estado = req.query.estado;
    estado = decodeURI(estado);
    estado = estado.replace(/\s|\W|[#$^&*()]/g, "");
    Query.where('estado').equals(estado);
  }

  if(req.query && req.query.ciudad){
    var ciudad = req.query.ciudad;
    ciudad = decodeURI(ciudad);
    ciudad = ciudad.toLowerCase();
    Query.where('ciudad').equals( {$regex : new RegExp(ciudad), $options: "i"})
  }

  if(req.query && req.query.categoria){
    var categoria = req.query.categoria;
    Query.where('categoria._id').in([categoria]);
  }

  if(req.query && req.query.edadMin){
    var edadMin = parseInt(req.query.edadMin, 10);
    if(isNaN(edadMin)){
      console.log("El parámetro debe ser un número");
    } else {
      Query.where('edadMin').gte(edadMin);
    }
  }

  if(req.query && req.query.edadMax){
    var edadMax = parseInt(req.query.edadMax, 10);
    if(isNaN(edadMax)){
      console.log("El parámetro debe ser un número");
    } else {
      Query.where('edadMax').lte(edadMax);
    }
  }

  if(req.query && req.query.datos){
    var datos = req.query.datos;
    datos = decodeURI(datos);
    // datos = datos.replace(/\s|\W|[#$^&*()]/g, "");
    console.log(datos);

    Query.where('descripcion').equals({'$regex': datos});
  }

  if(req.query && req.query.salario){
    var salario = req.query.salario;
    var sueldo = salario.split("-");
    if(isNaN(sueldo[0])){
      console.log("El parámetro debe ser un número");
    } else {
      sueldo[1] = sueldo[1].replace(/\s|\W|[#$^&*()]/g, "");
      console.log(sueldo[0], sueldo[1]);
      Query.where('salario.cantidad').gte(sueldo[0]);
      if(sueldo[1]){
        Query.where('salario.periodo').equals(sueldo[1]);
      }
    }
  }

  if(req.query && req.query.contrato){
    var contrato = req.query.contrato;
    contrato.replace(/\s|\W|[#$^&*()]/g, "");
    Query.where('tipoContrato').equals(contrato);
  }

  if(isNaN(offset) || isNaN(count)){
    res
      .status(400)
      .json({
        "message" : "Los datos enviados en el query deben ser números"
      });
    return;
  }

  Query.sort('-createdOn');
  // Vacante
  //   .find()
  //   .populate('area', '_id name')
  //   .populate('autor', '_id name lastname')
  //   .skip(offset)
  //   .limit(count)
  //   .sort('-createdOn')
  //   .select({area : area})
  Query
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
      expiresIn : vacante.expiresIn,
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

module.exports.vacantesGetOne = function(req, res){
  var vacanteId = req.params.vacanteId;
  console.log("GET the vacante", vacanteId);

  var options = '';

  if(req.level === 'visitor'){
    options += '-users';
  }

  Vacante
    .findById(vacanteId)
    .populate('area', '_id name')
    .populate('autor', '_id name lastname')
    .populate('users', '_id name lastname email')
    .select(options)
    .exec(function(err, vacante){
      if(err){
        console.log("Error finding vacante", vacanteId);
        res
          .status(500)
          .json(err);
      } else if(!vacante){
        console.log("Vacante " + vacanteId + " not found");
        res
          .status(404)
          .json({
            "message" : "Vacante buscada no existe"
          });
      } else {
        console.log("Found vacante: " + vacanteId);
        res
          .status(200)
          .json(vacante);
      }
    });
};

module.exports.vacantesUpdateOne = function(req, res){
  var vacanteId = req.params.vacanteId;

  console.log("PUT the vacante " + vacanteId);

  upload(req, res, function(err){
    if(err){
      res
        .status(500)
        .json(err);
    } else {
      console.log("Updating vacante");
      var newVacante = req.body.vacante;
      console.log(newVacante, "aquí está recibida", req.file);

      var filename;

      if(req.file){
        filename = req.file.filename;
      }

      Vacante
        .findById(vacanteId)
        .exec(function(err, vacante){
          var response = {
            status : 200,
            message : []
          };

          if(err){
            console.log("Ha ocurrido un error")
          } else if (!vacante){
            console.log("Vacante no encontrada", vacanteId);
            response.status = 404;
            response.message = {
              "message" : "Vacante no encontrada: " + vacanteId
            };
          }
          if(vacante){
            console.log(vacante, "antes");
            if(newVacante.puesto){
              vacante.puesto = newVacante.puesto;
            }
            if(newVacante.area){
              vacante.area = newVacante.area;
            }
            if(newVacante.categoria){
              vacante.categoria = newVacante.categoria;
            }
            if(newVacante.descripcion){
              vacante.descripcion = newVacante.descripcion;
            }
            if(newVacante.pais){
              vacante.pais = newVacante.pais;
            }
            if(newVacante.estado){
              vacante.estado = newVacante.estado;
            }
            if(newVacante.ciudad){
              vacante.ciudad = newVacante.ciudad;
            }
            if(newVacante.jornada){
              vacante.jornada = newVacante.jornada;
            }
            if(newVacante.tipoContrato){
              vacante.tipoContrato = newVacante.tipoContrato;
            }

            vacante.salario = newVacante.salario;

            vacante.fechaContrato = newVacante.fechaContrato;

            vacante.experiencia = newVacante.experiencia;

            if(newVacante.edadMin){
              vacante.edadMin = newVacante.edadMin;
            }
            if(newVacante.edadMax){
              vacante.edadMax = newVacante.edadMax;
            }
            if(newVacante.escolaridad){
              vacante.escolaridad = newVacante.escolaridad;
            }

            vacante.idioma = newVacante.idioma;

            vacante.software = newVacante.software;

            if(newVacante.expiresIn){
              vacante.expiresIn = newVacante.expiresIn;
            }

            if(filename){
              vacante.imagen = filename;
            }

            console.log(vacante, "después");

            vacante.save(function(err, vacanteUpdated){
              if(err){
                res
                  .status(500)
                  .json(err)
              } else {
                res
                  .status(201)
                  .json();
              }
            });
          } else {
            res
              .status(response.status)
              .json(response.message);
          }
        });
    }
  });

};

module.exports.vacanteApplyUser = function(req, res){
  var vacanteId = req.params.vacanteId;
  var userId = req.payload._id;

  console.log("PATCH the Vacante " + vacanteId + ", add User " + userId);

  Vacante
    .findById(vacanteId)
    .select('users')
    .exec(function(err, vacante){
      var response = {
        status : 200,
        message : []
      };

      if(err){
        console.log("Error finding Vacante "+vacanteId);
        response.status = 500;
        response.message = err;
      } else if(!vacante){
        console.log("Vacante ID not found in database", vacanteId);
        response.status = 404;
        response.message = {
          "message" : "La ID de la vacante (" + vacanteId + ") no se encontró en la base de datos"
        };
      }

      if(vacante){
        if (vacante.users.indexOf(userId) > -1) {
          res
            .status(409)
            .json({
              "message" : "Usted ya se encuentra postulado a esta vacante"
            });
        } else {
          vacante.users.push(userId);

          vacante.save(function(err, vacanteUpdated){
            if(err){
              res
                .status(500)
                .json(err);
            } else {
              _applyToUser(req, res);
            }
          });
        }
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });
};

var _applyToUser = function(req, res){
  var vacanteId = req.params.vacanteId;
  var userId = req.payload._id;

  User
    .findById(userId)
    .select('vacantes')
    .exec(function(err, user){
      var response = {
        status : 200,
        message : []
      };
      if(err){
        console.log("Error finding user "+userId);
        response.status = 500;
        response.message = err;
      } else if(!user){
        console.log("User ID not found in database", userId);
        response.status = 404;
        response.message = {
          "message" : "La ID del usuario (" + userId + ") no se encontró en la base de datos"
        };
      }

      if(user){
        if (user.vacantes.indexOf(vacanteId) > -1) {
          res
            .status(409)
            .json({
              "message" : "Usted a esta vacante ya se encuentra postulado"
            });
        } else {
          user.vacantes.push(vacanteId);

          user.save(function(err, userUpdated){
            if(err){
              res
                .status(500)
                .json(err);
            } else {
              res
                .status(201)
                .json();
            }
          });
        }
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    })
};
