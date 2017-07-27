angular.module('meanPulso').controller('vacanteCtrl', vacanteCtrl);

vacanteCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'meanData', 'authentication', '$window'];

function vacanteCtrl($rootScope, $routeParams, $location, meanData, authentication, $window){
  var vm = this;

  $rootScope.header = "Vacante";

  vm.vacantes = [];

  vm.error = false;
  vm.message = '';
  vm.response = false;
}
