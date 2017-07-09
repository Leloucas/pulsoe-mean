angular.module('meanPulso').controller('dashboardCtrl',dashboardCtrl);

profileCtrl.$inject = ['$rootScope', '$location'];

function dashboardCtrl($rootScope, $location){
  var vm = this;

  $rootScope.header = "Panel de administración";
}
