angular.module('meanPulso').controller('addExpCtrl',addExpCtrl);

addExpCtrl.$inject = ['$rootScope','$location', 'meanData', '$routeParams', '$timeout'];
function addExpCtrl($rootScope, $location, meanData, $routeParams, $timeout){
  var vm = this;

  console.log(meanData);

  $rootScope.header = "agregar experiencia";

  vm.year = new Date().getFullYear();

  vm.months = [
    {"mes":01, "nombre":"Enero"},
    {"mes":02, "nombre":"Febrero"},
    {"mes":03, "nombre":"Marzo"},
    {"mes":04, "nombre":"Abril"},
    {"mes":05, "nombre":"Mayo"},
    {"mes":06, "nombre":"Junio"},
    {"mes":07, "nombre":"Julio"},
    {"mes":08, "nombre":"Agosto"},
    {"mes":09, "nombre":"Septiembre"},
    {"mes":10, "nombre":"Octubre"},
    {"mes":11, "nombre":"Noviembre"},
    {"mes":12, "nombre":"Diciembre"}
  ];

  vm.years = [];
  for (var i = vm.year; i >= (vm.year - 125); i-=1) {
      vm.years.push(i);
  }

  vm.saveExperiencia = function(){
    vm.message = "";
    vm.experiencia.fechaInicio = new Date(vm.experiencia.yearInicio, vm.experiencia.mesInicio.mes - 1, "01");
    if(!vm.actual){
      vm.experiencia.fechaFinal = new Date(vm.experiencia.yearFinal, vm.experiencia.mesFinal.mes - 1, "01");
    } else {
      vm.experiencia.fechaFinal = "";
    }


    if(vm.experienciaForm.$valid){

      meanData.experienciaSave(vm.experiencia)
      .then(function(response){
        if(response.status === 201){
          vm.message = "Guardado exitosamente, volviendo al perfil...";
          $timeout(function(){
            $location.path('/perfil');
          }, 2500);
        }
      })
      .catch(function(error){
        console.log(error)
      });
    } else {
      vm.message = "Complete correctamente los campos";
    }

  };
}
