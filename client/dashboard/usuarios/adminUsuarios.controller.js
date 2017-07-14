angular.module('meanPulso').controller('adminUsersCtrl',adminUsersCtrl);

adminUsersCtrl.$inject = ['$rootScope', '$location', 'meanData', '$window', 'authentication'];

function adminUsersCtrl($rootScope, $location, meanData, $window, authentication){
  var vm = this;

  $rootScope.header = "Listado de usuarios";

  vm.users = [];

  meanData.getAllUsers()
    .then(function(response){
      if(response.status === 200){
        vm.users = response.data;
      } else if(response.status === 403){
        $window.alert("Usted no cuenta con permiso para ver esta página, favor de contactar al administrador");
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

    // http://embed.plnkr.co/zkTf2s/
}
