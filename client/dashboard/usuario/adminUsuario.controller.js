angular.module('meanPulso').controller('adminUsuarioCtrl',adminUsuarioCtrl);

adminUsuarioCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'authentication', 'meanData'];

function adminUsuarioCtrl($rootScope, $routeParams, $location, authentication, meanData){
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
      }

    })
    .catch(function(error){
      console.log(error);
    })
}
