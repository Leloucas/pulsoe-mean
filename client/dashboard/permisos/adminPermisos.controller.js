angular.module('meanPulso').controller('adminPermisosCtrl',adminPermisosCtrl);

adminPermisosCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'authentication', 'meanData' , '$window'];

function adminPermisosCtrl($rootScope, $routeParams, $location, authentication, meanData, $window){
  var vm = this;

  $rootScope.header = "Editar permisos";

  var userId = $routeParams.userId;

  vm.response = false;
  vm.error = false;
  vm.message = "";

  meanData.getOneUser(userId)
    .then(function(response){
      if(response.status === 404){
        vm.response = true;
        vm.error = true;
        vm.message = "Usuario no encontrado en la base de datos";
      } else if(response.status === 200){
        vm.error = false;
        vm.user = response.data;
      } else if(response.status === 403){
        vm.error = true;
        vm.response = true;
        $window.alert("Usted no cuenta con permiso de usuario, favor de contactar al administrador");
        authentication.logout();
      }

    })
    .catch(function(error){
      console.log(error);
    });

  vm.saveUser = function(){
    if(!vm.error){

      var level = {
        "level" : vm.user.level
      };
      meanData.updateUser(userId, level)
        .then(function(response){
          if(response.status === 204){
            vm.error = false;
            vm.response = true;
            vm.message = "Usuario actualizado. Para que el usuario editado vea los cambios debe cerrar sesión y volver a iniciar";
          } else if(response.status === 404){
            vm.response = true;
            vm.error = true;
            vm.message = "Usuario no encontrado en la base de datos. Deje de intentarlo.";
          }
        })
        .catch(function(error){
          console.log(error);
      });
    }
  };
}
