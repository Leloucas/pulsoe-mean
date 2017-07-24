angular.module('meanPulso').controller('areaCtrl', areaCtrl);

areaCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'meanData', 'authentication', '$window'];

function areaCtrl($rootScope, $routeParams, $location, meanData, authentication, $window){
  var vm = this;

  $rootScope.header = "Area";
}
