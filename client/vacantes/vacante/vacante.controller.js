angular.module('meanPulso').controller('showVacanteCtrl',showVacanteCtrl);

showVacanteCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'meanData', 'authentication', '$window', '$timeout'];

function showVacanteCtrl($rootScope, $routeParams, $location, meanData, authentication, $window, $timeout){
  var vm = this;

  $rootScope.header = "Vacante";

  var vacanteId = $routeParams.vacanteId;

  vm.vacante = {};

  meanData.getOneVacante(vacanteId)
    .then(function(response){
      console.log(response);
      if(response.status === 200){
        vm.vacante = response.data;
      } else if(response.status === 500){
        console.log(response);
      }
    })
    .catch(function(error){
      console.log(error);
  });
}
