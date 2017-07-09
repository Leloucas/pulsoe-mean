var mongoose = require('mongoose');
// protocol-server:port/dbname
var dburl = 'mongodb://localhost:27017/MEANPulso';

mongoose.connect(dburl);

mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to '+dburl);
});
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});
mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error: '+err);
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination (SIGINT)');
    process.exit(0);
  });
});
process.on('SIGTERM', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination (SIGTERM)');
    process.exit(0);
  });
});
process.once('SIGUSR2', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination (SIGUSR2)');
    process.kill(process.pid, 'SIGUSR2');
  });
});
//  BRING IN SCHEMAS AND MODELS
require('./hotels.models.js');
require('./users.model.js');



// // Este query se utiliza para darle ID a los subdocumentos que se incluyan en la base de datos, haciendo una búsqueda y reemplazo
// db.hotels.update(
//   {},
//   {
//     $set : {
//       "reviews.0._id" : ObjectId()
//     }
//   },
//   {
//     multi : true
//   }
// )
