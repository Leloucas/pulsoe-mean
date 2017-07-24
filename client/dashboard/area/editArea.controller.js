angular.module('meanPulso').controller('editAreaCtrl', editAreaCtrl);

editAreaCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'meanData', 'authentication', '$window'];

function editAreaCtrl($rootScope, $routeParams, $location, meanData, authentication, $window){
  var vm = this;

  $rootScope = "Editar área";

  var areaId = $routeParams.areaId;

  vm.response = false;
  vm.error = false;
  vm.message = "";

  vm.area = {};

  meanData.getOneArea(areaId)
    .then(function(response){
      if(response.status === 200){
        vm.response = false;
        vm.error = false;
        vm.area = response.data;
      } else if(response.status === 500){
        console.log(response);
        vm.response = true;
        vm.error = true;
        vm.message = "Hubo un error al buscar el área";
      } else if(response.status === 403){
        vm.error = true;
        vm.response = true;
        $window.alert("Usted no cuenta con permiso de usuario, favor de contactar al administrador");
        authentication.logout();
      } else if(response.status === 404){
        console.log(response);
        vm.response = true;
        vm.error = true;
        vm.message = "El área buscada no existe";
      }
    })
    .catch(function(error){
      console.log(error);
  });

  vm.updateArea = function(){
    var area = {
      "name" : vm.area.name,
      "descripcion" : vm.area.descripcion
    };
    meanData.updateArea(areaId, area)
      .then(function(response){
        if(response.status === 204){
          vm.response = true;
          vm.error = false;
          vm.message = "Área editada correctamente. Haca clic aquí para volver";
        } else if(response.status === 500){
          console.log(response);
          vm.response = true;
          vm.error = true;
          vm.message = "Hubo un error al buscar el área.";
        } else if(response.status === 403){
          vm.error = true;
          vm.response = true;
          $window.alert("Usted no cuenta con permiso de usuario, favor de contactar al administrador");
          authentication.logout();
        } else if(response.status === 404){
          console.log(response);
          vm.response = true;
          vm.error = true;
          vm.message = "El área buscada no existe. Por favor deje de intentarlo";
        }
      })
      .catch(function(error){
        console.log(error);
    });
  }
}
