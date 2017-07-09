var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  rating : {
    type : Number,
    min : 0,
    max : 5,
    required : true
  },
  review : {
    type : String,
    required : true
  },
  createdOn: {
    type : Date,
    default : Date.now
  }
});

var roomSchema = new mongoose.Schema({
  type : String,
  number : Number,
  description : String,
  photos : [String],
  price : Number
});

var hotelSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  stars : {
    type : Number,
    min : 0,
    max : 5,
    default : 0
  },
  services : [String],
  description : String,
  photos : [String],
  currency : String,
  reviews : [reviewSchema],
  rooms : [roomSchema],
  location : {
    adress: String,
    // Siempre que se guarden coordenadas se guarda en el orden longitud (E/O), latitud (N/S)
    coordinates : {
      type : [Number],
      index : '2dsphere'
    }
  }
});

// Si se excluye el tercer parámetro el modelo buscará una base de datos como el primer parámetro pero en minúsculas y con una S al final
mongoose.model("Hotel", hotelSchema, 'hotels');
