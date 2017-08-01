var mongoose = require('mongoose');
var multer = require('multer');
var User = mongoose.model('User');
var fs = require('fs');

//multers disk storage settings
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/users/avatar/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null,
          // file.fieldname +
          'avatar-' + datetimestamp +
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

    for( var i=0; i < len; i++ ){
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
}

module.exports.profileRead = function(req, res){
  // no user exists
  if (!req.payload._id) {
    res
      .status(401)
      .json({
        "message" : "UnauthorizedError: private profile"
      });
  } else {
    User
      .findById(req.payload._id)
      // .select('name lastname email profile')
      .select('-level -hash -salt -registered -createdOn -deletedOn')
      // .populate('vacantes','_id area.name categoria.name descripcion ')
      .populate({
        path : 'vacantes',
        select : 'area categoria imagen puesto descripcion estado ciudad pais',
        populate : {
          path :'area',
          select : '-categorias'
        }
      })
      .exec(function(err, user){
        if (err) {
          res
            .status(500)
            .json(err);
        } else {
          res
            .status(200)
            .json(user);
        }
      });
  }
};

module.exports.getUserData = function(req, res){
  if (!req.payload._id) {
    res
      .status(401)
      .json({
        "message" : "UnauthorizedError: private profile"
      });
  } else {
    User
      .findById(req.payload._id)
      // .select('name lastname email profile')
      .select('data')
      .exec(function(err, user){
        if (err) {
          res
            .status(500)
            .json(err);
        } else {
          res
            .status(200)
            .json(user);
        }
      });
  }
};

module.exports.updateUserData = function(req, res){
  if (!req.payload._id) {
    res
      .status(401)
      .json({
        "message" : "UnauthorizedError: private profile"
      });
  } else {
    var userId = req.payload._id;
    console.log("Editing profile for user " + userId);
    User
      .findById(userId)
      .exec(function(err, user){
        var response = {
          status : 200,
          message : []
        };
        if(err){
          console.log("Ha ocurrido un error");
          response.status = 500;
          response.message = err;
        } else if(!user){
          console.log("Usuario no encontrado", userId);
          response.status = 404;
          response.message = {
            "message" : "Usuario no encontrado :" + userId
          };
        }
        if(user){
          var userData = req.body;
          if(userData.fechaNacimiento){
            user.data.fechaNacimiento = userData.fechaNacimiento;
          }
          if(userData.sexo){
            user.data.sexo = userData.sexo;
          }
          if(userData.estadoCivil){
            user.data.estadoCivil = userData.estadoCivil;
          }

          user.data.telefono = userData.telefono;

          if(userData.celular){
            user.data.celular = userData.celular;
          }

          if(userData.nacionalidad){
            user.data.nacionalidad = userData.nacionalidad;
          }

          user.data.licenciaConducir = userData.licenciaConducir;

          user.data.vehiculoPropio = userData.vehiculoPropio;

          user.data.linkedIn = userData.linkedIn;

          user.data.twitter = userData.twitter;

          user.data.facebook = userData.facebook;

          user.data.discapacidad = userData.discapacidad;

          if(userData.location.direccion){
            user.data.location.direccion = userData.location.direccion;
          }
          if(userData.location.coordenadas){
            user.data.location.coordenadas = userData.location.coordenadas;
          }
          if(userData.location.pais){
            user.data.location.pais = userData.location.pais;
          }
          if(userData.location.estado){
            user.data.location.estado = userData.location.estado;
          }
          if(userData.location.ciudad){
            user.data.location.ciudad = userData.location.ciudad;
          }


          user.save(function(err, userUpdated){
            if (err) {
              res
                .status(500)
                .json(err);
            } else {
              res
                .status(204)
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
};

module.exports.uploadFile = function(req, res) {
  // console.log(req, "upload");
  // console.log(req.payload._id);
  if (!req.payload._id) {
    res
      .status(401)
      .json({
        "message" : "UnauthorizedError: private profile"
      });
  } else {
    var userId = req.payload._id;
    upload(req,res,function(err){
      if(err){
        res
         .status(500)
         .json(err);
      } else {
        console.log(req.file,"here it is");
        var filename;
        if(req.file){
          filename = req.file.filename;
        }
        User
          .findById(userId)
          .exec(function(err, user){
            var response = {
              status : 200,
              message : []
            };
            if(err){
              console.log("Ha ocurrido un error");
              response.status = 500;
              response.message = err;
            } else if(!user){
              console.log("Usuario no encontrado", userId);
              response.status = 404;
              response.message = {
                "message" : "Usuario no encontrado :" + userId
              };
            }
            if(user){
              // console.log(userData, "aquí");
              user.data.imagen = filename;

              user.save(function(err, userUpdated){
                if (err) {
                  res
                    .status(500)
                    .json(err);
                } else {
                  var token = userUpdated.generateJWT();
                  res
                    .status(201)
                    .json(token);
                }
              });
            } else {
              res
                .status(response.status)
                .json(response.message);
            }
          });
      };
    });
  }
};

module.exports.updateInfo = function(req, res) {
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
          _addInfo(req, res);
        }
    });
  }
};

var _addInfo = function(req, res) {
  var userId = req.payload._id;
  var usuario = req.body.user;

  var userData = usuario.datos;
  var userFormacion = usuario.formacion;
  var userIdioma = usuario.idioma;
  var userCapacitacion = usuario.capacitacion;
  var userExperiencia = usuario.experiencia;
  var skill = usuario.habilidad;
  var userSoftware = usuario.software;
  var userSalary = usuario.salary;
  var userPosition = usuario.position;
  var userValues = usuario.values;
  var userAreas = usuario.areas;

  console.log("got this: ",usuario);

  // console.log("datos",usuario.datos);
  // console.log("formacion",usuario.formacion);
  // console.log("idioma",usuario.idioma);
  // console.log("capacitacion",usuario.capacitacion);
  // console.log("experiencia",usuario.experiencia);
  // console.log("habilidad",usuario.habilidad);
  // console.log("software",usuario.software);
  // console.log("salary",usuario.salary);
  // console.log("position",usuario.position);
  // console.log("values",usuario.values);

  if(req.file){
    userData.imagen = req.file.filename;
    // filename = req.file.filename;
  }
  // console.log(userId);

  User
    .findById(userId)
    .exec(function(err, user){
      var response = {
        status : 200,
        message : []
      };
      if(err){
        console.log("Ha ocurrido un error");
        response.status = 500;
        response.message = err;
      } else if(!user){
        console.log("Usuario no encontrado", userId);
        response.status = 404;
        response.message = {
          "message" : "Usuario no encontrado :" + userId
        };
      }
      if(user){
        // console.log(userData, "aquí");
        user.data = userData;

        for (var i = 0; i < userExperiencia.length; i+=1) {
          user.experience.push(userExperiencia[i]);
        }

        user.schooling = userFormacion;

        for (var i = 0; i < userSoftware.length; i+=1) {
          user.software.push(userSoftware[i]);
        }

        for (var i = 0; i < userIdioma.length; i+=1) {
          user.languages.push(userIdioma[i]);
        }

        for (var i = 0; i < userCapacitacion.length; i+=1) {
          user.courses.push(userCapacitacion[i]);
        }

        user.values = userValues;

        user.areas = userAreas;

        user.skills = skill;

        user.salary = userSalary;

        user.position = userPosition;

        user.registered = true;

        // console.log("ya editado: ", user);

        user.save(function(err, userUpdated){
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            var token = userUpdated.generateJWT();
            res
              .status(201)
              .json(token);
          }
        });
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });
};
