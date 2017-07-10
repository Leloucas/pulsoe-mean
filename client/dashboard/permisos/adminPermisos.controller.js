angular.module('meanPulso').controller('adminPermisosCtrl',adminPermisosCtrl);

adminPermisosCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'authentication', 'meanData'];

function adminPermisosCtrl($rootScope, $routeParams, $location, authentication, meanData){
  var vm = this;

  $rootScope.header = "Editar permisos";

  var userId = $routeParams.userId;

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
    });

  vm.saveUser = function(){
    console.log(vm.user.level, "guardado papu");
  };
}
