angular.module('meanPulso').controller('expCtrl',expCtrl);

expCtrl.$inject = ['$rootScope','$location', 'meanData', '$routeParams', '$timeout'];
function expCtrl($rootScope, $location, meanData, $routeParams, $timeout){
  var vm = this;
  $rootScope.header = "editar experiencia";

  vm.message = "";

  var id = $routeParams.id;

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

  meanData.experienciaDisplay(id)
  .then(function(response){
      vm.experiencia = response.data;
      vm.getDates(vm.experiencia);
    }).catch(function(error){
      console.log(error);
  });

  vm.getDates = function(experiencia){
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    var inicio = new Date( experiencia.fechaInicio );
    var final = new Date( experiencia.fechaFinal );

    vm.experiencia.yearInicio = inicio.getFullYear();
    vm.experiencia.mesInicio = {"mes" : inicio.getMonth() + 1, "nombre" : meses[inicio.getMonth()]};

    if(experiencia.fechaFinal){
      vm.experiencia.yearFinal = final.getFullYear();
      vm.experiencia.mesFinal = {"mes" : final.getMonth() + 1, "nombre" : meses[final.getMonth()]};
    }
  };


  vm.years = [];
  for (var i = vm.year; i >= (vm.year - 125); i-=1) {
      vm.years.push(i);
  }

  vm.saveExperiencia = function(){
    // console.log(vm.experiencia);

    vm.experiencia.fechaInicio = new Date(vm.experiencia.yearInicio, vm.experiencia.mesInicio.mes - 1, "01");
    if(!vm.actual){
      vm.experiencia.fechaFinal = new Date(vm.experiencia.yearFinal, vm.experiencia.mesFinal.mes - 1, "01");
    } else {
      vm.experiencia.fechaFinal = "";
    }
    if(vm.experienciaForm.$valid){
      meanData.experienciaUpdate(id, vm.experiencia)
      .then(function(response){
        if(response.status === 204){
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
      vm.message = "Hay un error en el formulario";
    }

  };

}
