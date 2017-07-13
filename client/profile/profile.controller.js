angular.module('meanPulso').controller('profileCtrl',profileCtrl);

profileCtrl.$inject = ['$rootScope', 'meanData', '$window', 'authentication'];

function profileCtrl($rootScope, meanData, $window, authentication){
  var vm = this;

  $rootScope.header = "Mi perfil";

  vm.user = {};

  meanData.getProfile()
    .then(function(response) {
      vm.user = response.data;
    })
    .catch(function (e) {
      console.log(e);
    });

  vm.cancelAvatar = function(){
    vm.file = "";
  };

  vm.updateAvatar = function(){
    if(vm.file){
      meanData.updatePic(vm.file)
        .then(function(response){
          if (response.status === 201) {
            $window.alert("Imagen actualizada");
            $window.location.reload();
          }
        })
        .catch(function(error){
          console.log(error);
        });
    } else {
      $window.alert("Seleccione un archivo primero");
    }
  };

  // vm.newSoftwareForm.$setPristine();

  vm.addSoftware = function(){
    var software = {
      software : vm.newSoftwareName,
      nivel : vm.nivelSoft
    };
    meanData.saveNewSoftware(software)
      .then(function(response){
        if(response.status === 201){
          vm.user.software.push({
            software : response.data.software,
            nivel : response.data.nivel,
            _id : response.data._id
          });
        }
        vm.newSoftwareName = "";
        vm.newSoftwareForm.software.$touched = false;
        vm.nivelSoft = "";
        vm.newSoftwareForm.nivelSoft.$touched = false;
        vm.newSoftwareForm.$setPristine();
      })
      .catch(function(error){
        console.log(error);
    });
  };

  vm.deleteSoftware = function(id){
    var choice = $window.confirm("Está a punto de eliminar el registro. \nESTÁ ACCIÓN NO SE PUEDE DESHACER. \n¿Desea continuar?");
    if(choice){
      meanData.deleteSoftware(id)
        .then(function(response){
          if(response.status === 204){
            for(var i=0 ; i< vm.user.software.length; i+=1){
              if(vm.user.software[i]._id === id){
                vm.user.software.splice(i, 1);
              }
            }
          } else if(response.status === 500){
            console.log(response);
            $window.alert("Error al eliminar registro");
          }
        })
        .catch(function(error){
          console.log(error);
      });
    }
  };
}
