var mongoose = require('mongoose');
var multer = require('multer');
var User = mongoose.model('User');

module.exports.frontPage = function(req, res){
  console.log(req, "got here");
  res
    .status(200)
    .json({
      "message" : "welcome to the front page"
    });
};
