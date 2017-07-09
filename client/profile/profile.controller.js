angular.module('meanPulso').controller('profileCtrl',profileCtrl);

profileCtrl.$inject = ['$location', 'meanData', 'Upload', '$window', '$rootScope', '$timeout'];
function profileCtrl($location, meanData, Upload, $window, $rootScope, $timeout){
  var vm = this;

  console.log(Upload);

  $rootScope.header = "Mi Perfil";

  vm.user = {};

  meanData.getProfile()
    .then(function(response) {
      vm.user = response.data;
      // vm.user.name = response.data.name;
      // vm.user.lastname = response.data.lastname;
      // vm.user.email = response.data.email;

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
