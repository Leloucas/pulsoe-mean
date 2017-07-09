angular.module('meanPulso').controller('adminUsersCtrl',adminUsersCtrl);

adminUsersCtrl.$inject = ['$rootScope', '$location', 'meanData'];

function adminUsersCtrl($rootScope, $location, meanData){
  var vm = this;

  $rootScope.header = "Listado de usuarios";

  vm.users = [];

  meanData.getAllUsers()
    .then(function(response){
      vm.users = response.data;
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
