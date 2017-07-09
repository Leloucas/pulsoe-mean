var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

// GET all reviews for a hotel
module.exports.reviewsGetAll = function(req, res){
  var hotelId = req.params.hotelId;
  console.log('GET the hotelId', hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc){
      var response = {
        status : 200,
        message : []
      };
      if (err){
        console.log("Error finding reviews")
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        console.log('Returned doc', doc);
        response.message = doc.reviews ? doc.reviews : [];
      }
      res
        .status(response.status)
        .json( response.message );
    });
};

// GET single review for a hotel
module.exports.reviewsGetOne = function(req, res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('GET the reviewId ' + reviewId + " for hotelId " + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
      var response = {
        status : 200,
        message : hotel
      };

      console.log('Returned hotel', hotel);
      var review = hotel.reviews.id(reviewId);
      response.message = review;

      if (err){
        console.log("Error finding review for hotel "+ hotelId);
        response.status = 500;
        response.message = err;
      } else if(!review) {
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

var _addReview = function(req, res, hotel) {

  hotel.reviews.push({
    name : req.body.name,
    rating : parseInt(req.body.rating, 10),
    review : req.body.review
  });

  hotel.save(function(err, hotelUpdated){
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(201)
        .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
    }
  });

};

module.exports.reviewsAddOne = function(req, res){
  var hotelId = req.params.hotelId;
  console.log('GET the hotelId', hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc){
      var response = {
        status : 200,
        message : []
      };
      if (err){
        console.log("Error finding reviews")
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      }
      if (doc){
        _addReview(req, res, doc);
      } else {
        res
          .status(response.status)
          .json( response.message );
      }
    });
};

module.exports.reviewsUpdateOne = function(req, res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('PUT the reviewId ' + reviewId + " for hotelId " + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
      var thisReview;
      var response = {
        status : 200,
        message : []
      };
      // console.log('Returned hotel', hotel);
      // var review = hotel.reviews.id(reviewId);
      // response.message = review;
      if (err){
        console.log("Error finding review for hotel "+ hotelId);
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found" + hotelId
        };
      } else {
        // GET the review
        thisReview = hotel.reviews.id(reviewId);
        // if the review doesn't exist mongoose returns null
        if(!thisReview){
          response.status = 404;
          response.message = {
            "message" : "review ID not found "+reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json( response.message );
      } else {
        thisReview.name = req.body.name;
        thisReview.rating = parseInt(req.body.rating, 10);
        thisReview.review = req.body.review;
        hotel.save(function(err, hotelUpdated){
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
      }
    });
};

module.exports.reviewsDeleteOne = function(req, res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('DELETE the reviewId ' + reviewId + " for hotelId " + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
      var thisReview;
      var response = {
        status : 200,
        message : []
      };
      // console.log('Returned hotel', hotel);
      // var review = hotel.reviews.id(reviewId);
      // response.message = review;
      if (err){
        console.log("Error finding review for hotel "+ hotelId);
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found" + hotelId
        };
      } else {
        // GET the review
        thisReview = hotel.reviews.id(reviewId);
        // if the review doesn't exist mongoose returns null
        if(!thisReview){
          response.status = 404;
          response.message = {
            "message" : "review ID not found "+reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json( response.message );
      } else {
        console.log("Deleting review " + reviewId);
        hotel.reviews.id(reviewId).remove();
        hotel.save(function(err, hotelUpdated){
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
      }
    });
};
