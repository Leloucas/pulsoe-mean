var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res){
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.lastname = req.body.lastname;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err){
    if(err){
      sendJSONresponse(res, 500, err);
      return;
    }
    var token;
    token = user.generateJWT();
    res.status(201);
    res.json(token);
  });
};

module.exports.login = function(req, res){
  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  req.body.email = req.body.email.toLowerCase();

  passport.authenticate('local', function(err, user, info){
    var token;

    // passport throws/catches an error
    if(err){
      res.status(404).json(err);
      return;
    }
    // user found
    if(user){
      token = user.generateJWT();
      console.log(user.registered);
      res.status(200);
      res.json(
        token
      );
    } else {
      // user not found
      res
        .status(401)
        .json(info);
    }
  })(req, res);
};

module.exports.updateInfo = function(req, res){
  // console.log(req);
  if (!req.payload._id) {
    res
      .status(401)
      .json({
        "message" : "UnauthorizedError: no user provided"
      });
  } else {
    User
      .findById(req.payload._id)
      // .select('name email')
      .exec(function(err, doc){
        if (err) {
          res
            .status(500)
            .json(err);
        }else if (!doc){
          res
            .status(404)
            .json({"message" : "user not found"});
        } else {
          console.log(doc.skills);
          doc.skills = "I have none of them";
          doc.save(function(err, userUpdated){
            if (err){
              res
                .status(500)
                .json(err);
            } else {
              res
                .status(200)
                .json(doc);
            }
          });

        }
      });
  }
};
