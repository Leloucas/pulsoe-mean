angular.module('meanPulso').controller('createAreaCtrl', createAreaCtrl);

createAreaCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'authentication', 'meanData' , '$window'];

function createAreaCtrl($rootScope, $routeParams, $location, authentication, meanData , $window){
  var vm = this;

  $rootScope.header = "Crear Area";

  vm.response = false;
  vm.error = false;
  vm.message = '';

  vm.createArea = function(){
    var area = {
      nombre : vm.nombre,
      descripcion : vm.descripcion
    };
    meanData.saveNewArea(area)
      .then(function(response){
        if(response.status === 201){
          vm.response = true;
          vm.error = false;
          vm.message = "Área creada correctamente. Haga clic aquí para volver";
        } else if(response.status === 500){
          console.log(response);
          vm.response = true;
          vm.error = true;
          vm.message = "Hubo un error al guardar";
        } else if(response.status === 403){
          vm.error = true;
          vm.response = true;
          $window.alert("Usted no cuenta con permiso de usuario, favor de contactar al administrador");
          authentication.logout();
        }
      })
      .catch(function(error){
        console.log(error)
    });

  };
}
