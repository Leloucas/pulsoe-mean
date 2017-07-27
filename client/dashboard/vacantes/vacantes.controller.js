angular.module('meanPulso').controller('vacantesCtrl', vacantesCtrl);

vacantesCtrl.$inject = ['$rootScope',  '$location', 'meanData', 'authentication', '$window'];

function vacantesCtrl($rootScope,  $location, meanData, authentication, $window){
  var vm = this;

  $rootScope.header = "Vacantes";

  vm.vacantes = [];

  vm.error = false;
  vm.message = '';
  vm.response = false;

  meanData.getVacantes()
    .then(function(response){
      if(response.status === 200){
        vm.vacantes = response.data;
        vm.error = false;
        vm.response = false;
      } else if(response.status === 500){
        console.log(response);
        vm.error = true;
        vm.response = true;
        vm.message = "Ha ocurrido un error al solicitar las vacantes";
      }
    })
    .catch(function(error){
      console.log(error);
  });

  vm.sort = function(keyname){
    vm.sortKey = keyname;
    vm.reverse = !vm.reverse;
  };

  vm.deleteVacante = function(vacanteId){
    var choice = $window.confirm("Está a punto de dar de baja esta vacante.\n¿Desea continuar?");
    if(choice){
      meanData.deleteVacante(vacanteId)
        .then(function(response){
          if(response.status === 204){
            $window.alert("Vacante borrada exitosamente");
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

  vm.restoreArea = function(vacanteId){
    var choice = $window.confirm("Está a punto de restablecer esta vacante.\n¿Desea continuar?");
    if(choice){
      var area = {
        _id : vacanteId
      };
      meanData.restoreVacante(vacanteId, area)
        .then(function(response){
          if(response.status === 204){
            $window.alert("Vacante restaurada exitosamente");
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
