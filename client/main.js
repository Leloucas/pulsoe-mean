angular.module('meanPulso', ['ngRoute', 'angularCSS', 'ngMap', 'ngFileUpload', 'ngAnimate']);

function config($routeProvider, $locationProvider, $qProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'home/home.view.html',
      controller: 'homeCtrl',
      controllerAs: 'vm',
      needsLogin : false,
      needsRegister: false
    })
    .when('/servicios', {
        templateUrl : 'home/servicios/index.html',
        controller : 'ServiciosController',
        controllerAs : 'vm',
        needsLogin : false,
        needsRegister: false
    })
    .when('/servicios/:servicio', {
        templateUrl : 'home/servicios/servicio.html',
        controller : 'ServicioController',
        controllerAs : 'vm',
        needsLogin : false,
        needsRegister: false
    })
    .when('/principios', {
        templateUrl : 'home/nosotros/index.html',
        controller : 'PrincipiosController',
        controllerAs : 'vm',
        needsLogin : false,
        needsRegister: false
    })
    .when('/codigo', {
        templateUrl : 'home/nosotros/index.html',
        controller : 'CodigoController',
        controllerAs : 'vm',
        needsLogin : false,
        needsRegister: false
    })
    .when('/compromiso', {
        templateUrl : 'home/nosotros/index.html',
        controller : 'CompromisoController',
        controllerAs : 'vm',
        needsLogin : false,
        needsRegister: false
    })
    .when('/contacto', {
        templateUrl : 'home/contacto/index.html',
        controller : 'ContactoController',
        controllerAs : 'vm',
        needsLogin : false,
        needsRegister: false
    })
     .when('/registro', {
       templateUrl: 'home/registro/register.view.html',
       controller: 'registerCtrl',
       controllerAs: 'vm',
       needsLogin : false,
       needsRegister: false
     })
     .when('/login', {
       templateUrl: '/auth/login/login.view.html',
       controller: 'loginCtrl',
       controllerAs: 'vm',
       needsLogin : false,
       needsRegister: false
     })
     .when('/informacion', {
       css : ['/css/user-style.css', '/css/user-custom.css'],
       templateUrl : '/user-panel/information/information.view.html',
       controller : 'infoCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : false
     })
     .when('/perfil',{
       css : ['/css/user-style.css', '/css/user-custom.css'],
       templateUrl : '/profile/profile.view.html',
       controller : 'profileCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true
     })
     .when('/perfil/editar',{
       css : ['/css/user-style.css', '/css/user-custom.css'],
       templateUrl : '/user-panel/general/user-general.view.html',
       controller : 'editInfoCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : false
     })
     .when('/perfil/:userId', {
       css : ['/css/admin-style.css', '/css/user-style.css', '/css/user-custom.css'],
       templateUrl : 'dashboard/usuario/adminPerfil.view.html',
       controller : 'adminUsuarioCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/experiencia',{
       css : ['/css/user-style.css', '/css/user-custom.css'],
       templateUrl : '/user-panel/experiencia/experiencia.view.html',
       controller : 'addExpCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true
     })
     .when('/experiencia/:id',{
       css : ['/css/user-style.css', '/css/user-custom.css'],
       templateUrl : '/user-panel/experiencia/experiencia.view.html',
       controller : 'expCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true
     })
     .when('/administracion', {
       css : ['/css/admin-style.css'],
       templateUrl : 'dashboard/main/main.view.html',
       controller : 'dashboardCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/usuarios', {
       css : ['/css/admin-style.css'],
       templateUrl : 'dashboard/usuarios/adminUsuarios.view.html',
       controller : 'adminUsersCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/usuarios/:userId', {
       css : ['/css/admin-style.css'],
       templateUrl : 'dashboard/permisos/adminPermisos.view.html',
       controller : 'adminPermisosCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/areas', {
       css : ['/css/admin-style.css'],
       templateUrl : 'dashboard/areas/areas.view.html',
       controller : 'areasCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/areas/crear', {
       css : ['/css/admin-style.css'],
       templateUrl : 'dashboard/area/createArea.view.html',
       controller : 'createAreaCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/areas/:areaId', {
       css : ['/css/admin-style.css'],
       templateUrl : 'dashboard/area/area.view.html',
       controller : 'areaCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/areas/:areaId/categorias', {
       css : ['/css/admin-style.css'],
       templateUrl : 'dashboard/categorias/categorias.view.html',
       controller : 'categoriaCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/areas/:areaId/categorias/crear', {
       css : ['/css/admin-style.css'],
       templateUrl : 'dashboard/categorias/createCategoria.view.html',
       controller : 'createCatCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/areas/:areaId/categorias/:catId', {
       css : ['/css/admin-style.css'],
       templateUrl : 'dashboard/categorias/editCategoria.view.html',
       controller : 'editCategoriaCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/areas/:areaId', {
       css : ['/css/admin-style.css'],
       templateUrl : 'dashboard/area/editArea.view.html',
       controller : 'editAreaCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/vacantes', {
       css : ['/css/admin-style.css'],
       templateUrl : 'dashboard/vacantes/vacantes.view.html',
       controller : 'vacantesCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/vacantes/crear', {
       css : ['/css/admin-style.css', '/css/user-style.css', '/css/user-custom.css'],
       templateUrl : 'dashboard/vacantes/crearVacante.view.html',
       controller : 'crearVacanteCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/administracion/vacantes/:vacanteId', {
       css : ['/css/admin-style.css', '/css/user-style.css', '/css/user-custom.css'],
       templateUrl : 'dashboard/vacantes/vacante.view.html',
       controller : 'vacanteCtrl',
       controllerAs : 'vm',
       needsLogin : true,
       needsRegister : true,
       adminOnly : true
     })
     .when('/vacantes',{
       templateUrl : 'vacantes/main/main.view.html',
       controller : 'mainVacanteCtrl',
       controllerAs : 'vm',
       needsLogin : false,
       needsRegister : false
     })
     .when('/vacantes/:vacanteId',{
       templateUrl : 'vacantes/vacante/vacante.view.html',
       controller : 'showVacanteCtrl',
       controllerAs : 'vm',
       needsLogin : false,
       needsRegister : false
     })
     .otherwise({redirectTo: '/'});

   // use the HTML5 History API
   $locationProvider.html5Mode(true);
   $qProvider.errorOnUnhandledRejections(false);
}

function run($rootScope, $location, authentication) {
  var userRegistered = false;
  var userLevel;
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if(authentication.isLoggedIn()){
      userRegistered = authentication.currentUser().registered;
      userLevel = authentication.currentUser().level;
    } else {
      userRegistered = false;
    }
    if (nextRoute.needsLogin && !authentication.isLoggedIn()) {
      $location.path('/');
    }
    if (authentication.isLoggedIn() && nextRoute.adminOnly && userLevel !== 'admin') {
      $location.path('/perfil');
    }
    if (!userRegistered && nextRoute.needsRegister && authentication.isLoggedIn()) {
      $location.path('/informacion');
    }
    if (userRegistered &&  $location.path() === '/informacion') {
      $location.path('/perfil');
    }
    if ($location.path() === '/registro' && authentication.isLoggedIn() || $location.path() === '/login' && authentication.isLoggedIn()) {
      $location.path('/perfil');
    }
  });
}

angular
  .module('meanPulso')
  .config(['$routeProvider', '$locationProvider', '$qProvider', config])
  .run(['$rootScope', '$location', 'authentication', run]);
