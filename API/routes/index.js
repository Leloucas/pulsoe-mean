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
var ctrlSoftware = require('../controllers/software.controller.js');
var ctrlAreas = require('../controllers/areas.controller.js');
var ctrlCategorias = require('../controllers/categorias.controller.js');
var ctrlVacantes = require('../controllers/vacantes.controller.js');

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
  .put(ctrlUsers.isAdmin, ctrlUsers.usersUpdateOne)
  .get(ctrlUsers.isAdmin, ctrlUsers.usersGetOne);

router
  .route('/profile')
  .put(ctrlUsers.authenticate, ctrlProfile.updateInfo)
  .get(ctrlUsers.authenticate, ctrlProfile.profileRead);

router
  .route('/upload')
  .put(ctrlUsers.authenticate, ctrlProfile.uploadFile);

router
  .route('/userdata')
  .get(ctrlUsers.authenticate, ctrlProfile.getUserData)
  .put(ctrlUsers.authenticate, ctrlProfile.updateUserData);

router
  .route('/experiencia')
  .post(ctrlUsers.authenticate, ctrlExp.expAddOne);

router
  .route('/software')
  .post(ctrlUsers.authenticate, ctrlSoftware.softAddOne);

router
  .route('/software/:softId')
  .delete(ctrlUsers.authenticate, ctrlSoftware.softDeleteOne);

router
  .route('/experiencia/:expId')
  .get(ctrlUsers.authenticate, ctrlExp.expGetOne)
  .put(ctrlUsers.authenticate, ctrlExp.expUpdateOne);

router
  .route('/areas')
  .get(ctrlUsers.isAdmin, ctrlAreas.areasGetAll)
  .post(ctrlUsers.isAdmin, ctrlAreas.areasAddOne);

router
  .route('/areas/:areaId')
  .get(ctrlUsers.isAdmin, ctrlAreas.areasGetOne)
  .put(ctrlUsers.isAdmin, ctrlAreas.areasUpdateOne)
  .patch(ctrlUsers.isAdmin, ctrlAreas.areasRestoreOne)
  .delete(ctrlUsers.isAdmin, ctrlAreas.areasDeleteOne);

router
  .route('/areas/:areaId/categorias')
  .get(ctrlUsers.isAdmin, ctrlCategorias.catGetall)
  .post(ctrlUsers.isAdmin, ctrlCategorias.catAddOne);

router
  .route('/areas/:areaId/categorias/:catId')
  .get(ctrlUsers.isAdmin, ctrlCategorias.catGetOne)
  .put(ctrlUsers.isAdmin, ctrlCategorias.catUpdateOne)
  .delete(ctrlUsers.isAdmin, ctrlCategorias.catDeleteOne);

router
  .route('/administracion')
  .get(ctrlUsers.isAdmin, ctrlAdmin.frontPage);

router
  .route('/vacantes')
  .get(ctrlVacantes.vacantesGetAll)
  .post(ctrlUsers.isAdmin, ctrlVacantes.vacantesSaveOne);

module.exports = router;
