var mongoose = require('mongoose');
var multer = require('multer');
var User = mongoose.model('User');
var fs = require('fs');

module.exports.expGetOne = function(req, res){
  var userId = req.payload._id;

  var expId = req.params.expId;
  // console.log(req);
  console.log("GET the experience ID "+expId);

  User
    .findById(userId)
    .select('experience')
    .exec(function(err, user){
      var response = {
        status : 200,
        message : user
      };

      console.log('Returned user', user);
      var experience = user.experience.id(expId);
      response.message = experience;

      console.log("exp ",experience);

      if (err){
        console.log("Error finding experience for user"+ userId);
        response.status = 500;
        response.message = err;
      } else if(!experience) {
        response.status = 404;
        response.message = {
          "message" : "Review ID not found"
        };
      }

      res
        .status(response.status)
        .json( response.message );
  });
};

module.exports.expAddOne = function(req, res){
  var userId = req.payload._id;

  console.log("Adding to user "+ userId);

  User
    .findById(userId)
    .select('experience')
    .exec(function(err, user){
      var response = {
        status : 200,
        message : []
      };
      if(err){
        console.log("Error finding experience");
        response.status = 500;
        response.message = err;
      } else if(!user) {
        console.log("User id not found in database", userId);
        response.status = 404;
        response.message = {
          "message" : "User ID not found " + userId
        };
      }
      if (user) {
        user.experience.push({
          nombre : req.body.nombre,
          giroEmpresa : req.body.giroEmpresa,
          puesto : req.body.puesto,
          area : req.body.area,
          fechaInicio : req.body.fechaInicio,
          fechaFinal : req.body.fechaFinal,
          descripcion : req.body.descripcion,
          sueldo : req.body.sueldo
        });
        user.save(function(err, userUpdated){
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(201)
              .json(userUpdated.experience[userUpdated.experience.length - 1]);
          }
        });
      } else {
        res
          .status(response.status)
          .json( response.message );
      }
    });
};

module.exports.expUpdateOne = function(req, res){
  var userId = req.payload._id;
  var expId = req.params.expId;
  // console.log(req);
  console.log("GET the experience ID "+expId + " for the user ID " + userId);

  console.log(req.body);

  User
    .findById(userId)
    .select('experience')
    .exec(function(err, user){
      var experience;
      var response = {
        status : 200,
        message : []
      };
      if(err){
        console.log("Error finding experience for user " + userId);
        response.status = 500;
        response.message = err;
      } else if(!user){
        response.status = 404;
        response.message = {
          "message" : "Experience ID not found "+expId
        };
      } else {
        experience = user.experience.id(expId);
        if(!experience){
          response.status = 404;
          response.message = {
            "message" : "Experience ID not found " + expId
          };
        }
      }

      if(response.status !== 200){
        res
          .status(response.status)
          .json( response.message );
      } else {
        if(req.body.nombre){
          experience.nombre = req.body.nombre;
        }
        if(req.body.giroEmpresa){
          experience.giroEmpresa = req.body.giroEmpresa;
        }
        if(req.body.puesto){
          experience.puesto = req.body.puesto;
        }
        if (req.body.area) {
          experience.area = req.body.area;
        }
        if (req.body.fechaInicio) {
          experience.fechaInicio = req.body.fechaInicio;
        }

        experience.fechaFinal = req.body.fechaFinal;

        if (req.body.descripcion) {
          experience.descripcion = req.body.descripcion;
        }
        if (req.body.sueldo) {
          experience.sueldo = req.body.sueldo;
        }

        user.save(function(err, userUpdated){
          if(err){
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};
