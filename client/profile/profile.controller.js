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
}
