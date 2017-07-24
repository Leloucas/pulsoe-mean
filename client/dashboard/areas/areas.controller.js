angular.module('meanPulso').controller('areasCtrl', areasCtrl);

areasCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'meanData', 'authentication', '$window'];

function areasCtrl($rootScope, $routeParams, $location, meanData, authentication, $window){
  var vm = this;

  $rootScope.header = "Áreas";

  vm.error = false;

  vm.response = false;

  vm.message = '';

  vm.areas = [];

  meanData.getAllAreas()
    .then(function(response){
      if(response.status === 200){
        vm.areas = response.data;
        vm.response = false;
      } else if(response.status === 500){
        console.log(response);
        vm.error = true;
        vm.response = true;
        vm.message = "Error al buscar las áreas";
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

  vm.sort = function(keyname){
    vm.sortKey = keyname;
    vm.reverse = !vm.reverse;
  };

  vm.deleteArea = function(areaId){
    var choice = $window.confirm("Está a punto de dar de baja esta área.\n¿Desea continuar?");
    if(choice){
      meanData.deleteArea(areaId)
        .then(function(response){
          if(response.status === 204){
            $window.alert("Área borrada exitosamente");
            $window.location.reload();
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
    }
  };

  vm.restoreArea = function(areaId){
    var choice = $window.confirm("Está a punto de restablecer esta área.\n¿Desea continuar?");
    if(choice){
      var area = {
        _id : areaId
      };
      meanData.restoreArea(areaId, area)
        .then(function(response){
          if(response.status === 204){
            $window.alert("Área restaurada exitosamente");
            $window.location.reload();
          } else if(response.status === 403){
            vm.error = true;
            vm.response = true;
            $window.alert("Usted no cuenta con permiso de usuario, favor de contactar al administrador");
            // authentication.logout();
          }
        })
        .catch(function(error){
          console.log(error);
      });
    }
  };
}
