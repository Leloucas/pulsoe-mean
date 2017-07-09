var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register = function(req,res){
  console.log('registering user');

  var username = req.body.username;
  var name = req.body.name || null;
  var password = req.body.password;

  User.create({
    username: username,
    name: name,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }, function(err, user){
    if (err) {
      console.log(err);
      res
        .status(400)
        .json(err);
    } else {
      console.log('user created', user);
      res
        .status(201)
        .json(user);
    }
  });
};

module.exports.login = function(req,res){
  console.log('logging user');
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    username : username
  }).exec(function(err, user){
    if (err) {
      console.log(err);
      res
        .status(400)
        .json(err);
    } else {

      if(bcrypt.compareSync(password, user.password)){
        console.log('User found', user);
        var token = jwt.sign({ username: user.username }, process.env.JWTKey, { expiresIn: 3600 });
        res
          .status(200)
          .json({success: true, token: token});
      } else {
        res
          .status(401)
          .json('Unauthorized');
      }

    }
  });
};

module.exports.usersGetAll = function(req, res){
  console.log('GET all users');

  User
    .find()
    .select(' -hash -salt -experience -schooling -software -languages -courses -values -skills -position -salary -areas')
    .sort('level createdOn')
    .exec(function(err, users){
      if (err){
        console.log("Error finding users")
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found users", users.length);
        res
          .status(200)
          .json(users);
      }
    });

};

module.exports.usersGetOne = function(req, res){
  var userId = req.params.userId;
  console.log('GET the userId', userId);

  User
    .findById(userId)
    .exec(function(err, doc){
      var response = {
        status : 200,
        message : doc
      };
      if (err){
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        response.status = 404;
        response.message = {
          "message" : "User ID not found"
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

module.exports.authenticate = function(req, res, next){

  var headerExists = req.headers.authorization;

  if(headerExists) {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWTKey, function(error, decoded){
      if(error){
        console.log(error);
        res
          .status(401)
          .json('Unauthorized');
      } else {
          req.payload = decoded;
          req.user = decoded.name;
          next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
};

module.exports.isAdmin = function(req, res, next){
  var headerExists = req.headers.authorization;

  if(headerExists) {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWTKey, function(error, decoded){
      if(error){
        console.log(error, "error here");
        res
          .status(403)
          .json('Unauthorized');
      } else {
        if(decoded.level === 'admin' || decoded.level === 'master'){
          req.payload = decoded;
          req.user = decoded.name;
          next();
        } else {
          res
            .status(403)
            .json({
              "message" : "Usted no cuenta con permiso para ver esta página"
            });
        }
      }
    });
  }else{
    res
      .status(403)
      .json({
        "message" : "No token provided"
      })
  }
};
