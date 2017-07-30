angular.module('meanPulso').controller('mainVacanteCtrl', mainVacanteCtrl);

mainVacanteCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'meanData', 'authentication', '$window', '$timeout'];

function mainVacanteCtrl($rootScope, $routeParams, $location, meanData, authentication, $window, $timeout){
  var vm = this;

  $rootScope.header = "Lista de Vacantes";

  var params = {};

  if(!angular.equals({}, $routeParams)){
    // console.log($routeParams);
    for (var key in $routeParams) {
      if (typeof $routeParams[key] !== 'function') {
        params[key] = $routeParams[key];
      }
    }
  }

  vm.vacantes = [];

  meanData.getVacantes(params)
    .then(function(response){
      if(response.status === 200){
        // console.log(response.data);
        vm.vacantes = response.data;
      } else if(response.status === 500){
        console.log(response);
      }
    })
    .catch(function(error){
      console.log(error);
  });

}
