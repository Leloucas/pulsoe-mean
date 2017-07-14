angular.module('meanPulso').controller('adminUsuarioCtrl',adminUsuarioCtrl);

adminUsuarioCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'authentication', 'meanData', '$window'];

function adminUsuarioCtrl($rootScope, $routeParams, $location, authentication, meanData, $window){
  var vm = this;

  $rootScope.header = "Usuario ";

  var userId = $routeParams.userId;

  vm.user = {};

  meanData.getOneUser(userId)
    .then(function(response){
      if(response.status === 404){
        $location.path('/administracion/usuarios')
      } else if(response.status === 200){
        vm.user = response.data;
      } else if(response.status === 403){
        $window.alert("Usted no cuenta con permiso de usuario, favor de contactar al administrador");
        authentication.logout();
      }

    })
    .catch(function(error){
      console.log(error);
    });
}
