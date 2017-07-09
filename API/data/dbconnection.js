var MongoClient = require('mongodb').MongoClient;
// protocol-server:port/dbname
var dburl = 'mongodb://localhost:27017/MEANhotel';

var _connection = null;
var open = function() {
  MongoClient.connect(dburl, function(err, db){
    // set _connection
    if(err){
      console.log("DB connection failed");
      return;
    }
    _connection = db;
    console.log("DB connection open", db);
  });
}
var get = function(){
  return _connection;
}

module.exports = {
  open : open,
  get : get
};
