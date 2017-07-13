var mongoose = require('mongoose');
var User = mongoose.model('User');
var fs = require('fs');

module.exports.softAddOne = function(req, res){
  var userId = req.payload._id;

  console.log("Adding to user "+ userId);
  User
    .findById(userId)
    .select('software')
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
        user.software.push({
          software : req.body.software,
          nivel : req.body.nivel
        });
        user.save(function(err, userUpdated){
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(201)
              .json(userUpdated.software[userUpdated.software.length - 1]);
          }
        });
      } else {
        res
          .status(response.status)
          .json( response.message );
      }
    });
};

module.exports.softDeleteOne = function(req, res){
  var userId = req.payload._id;
  var softId = req.params.softId;

  console.log("DELETE the softwareId "+softId+ " for user "+userId);

  User
    .findById(userId)
    .select('software')
    .exec(function(err, user){
      var thisSoft;
      var response = {
        status : 200,
        message : []
      };
      if (err){
        console.log("Error finding software for user " + userId);
        response.status = 500;
        response.message = err;
      } else if(!user){
        response.status = 404;
        response.message = {
          "message" : "software ID not found" + softId
        };
      } else {
        thisSoft = user.software.id(softId);
        if(!thisSoft){
          response.status = 404;
          response.message = {
            "message" : "software ID not found" + softId
          };
        }
      }
      if(response.status !== 200){
        res
          .status(response.status)
          .json(response.message);
      } else {
        console.log("deleting software "+softId);
        user.software.id(softId).remove();
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
        })
      }
    });
};
