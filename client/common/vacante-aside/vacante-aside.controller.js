angular.module('meanPulso').controller('vacanteAsideCtrl',vacanteAsideCtrl);

vacanteAsideCtrl.$inject = ['$location', 'authentication', '$routeParams', 'meanData'];

function vacanteAsideCtrl($location, authentication, $routeParams, meanData){
  var vm = this;

  vm.vacantes = [];

  vm.search = function(){
    console.log('ayy');
  };

  var params = {count: 3};

  meanData.getVacantes(params)
    .then(function(response){
      if(response.status === 200){
        vm.vacantes = response.data;
      } else if(response.status === 500){
        console.log(response);
      }
    })
    .catch(function(error){
      console.log(error);
  });

}
