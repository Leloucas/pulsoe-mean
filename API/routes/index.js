var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWTKey,
  userProperty: 'payload'
});

var ctrlHotels = require('../controllers/hotels.controller.js');
var ctrlReview = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlAuth = require('../controllers/authentication.controller.js');
var ctrlProfile = require('../controllers/profile.controller.js');
var ctrlExp = require('../controllers/experience.controller.js');
var ctrlAdmin = require('../controllers/administration.controller.js');

router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll)
  .post(ctrlHotels.hotelsAddOne);

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne)
  .delete(ctrlHotels.hotelsDeleteOne);

// router
//   .route('/hotels/new')
//   .post(ctrlHotels.hotelsAddOne);

// Review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReview.reviewsGetAll)
  .post(ctrlUsers.authenticate, ctrlReview.reviewsAddOne);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReview.reviewsGetOne)
  .put(ctrlReview.reviewsUpdateOne)
  .delete(ctrlReview.reviewsDeleteOne);

// Authentication
router
  .route('/users/register')
  .post(ctrlUsers.register);

router
  .route('/users/login')
  .post(ctrlUsers.login);

  // authentication
router
  .route('/register')
  .post(ctrlAuth.register);

router
  .route('/login')
  .post(ctrlAuth.login);

router
  .route('/users')
  .get(ctrlUsers.isAdmin, ctrlUsers.usersGetAll);

router
  .route('/users/:userId')
  .get(ctrlUsers.isAdmin, ctrlUsers.usersGetOne);

router
  .route('/profile')
  .put(ctrlUsers.authenticate, ctrlProfile.updateInfo)
  .get(ctrlUsers.authenticate, ctrlProfile.profileRead);

router
  .route('/upload')
  .put(ctrlUsers.authenticate, ctrlProfile.uploadFile);

router
  .route('/experiencia')
  .post(ctrlUsers.authenticate, ctrlExp.expAddOne);

router
  .route('/experiencia/:expId')
  .get(ctrlUsers.authenticate, ctrlExp.expGetOne)
  .put(ctrlUsers.authenticate, ctrlExp.expUpdateOne);

router
  .route('/administracion')
  .get(ctrlUsers.isAdmin, ctrlAdmin.frontPage);

module.exports = router;
