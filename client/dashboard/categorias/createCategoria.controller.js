angular.module('meanPulso').controller('createCatCtrl', createCatCtrl);

createCatCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'authentication', 'meanData' , '$window'];

function createCatCtrl($rootScope, $routeParams, $location, authentication, meanData , $window){
  var vm = this;

  var areaId = vm.areaId = $routeParams.areaId;

  vm.response = false;
  vm.error = false;
  vm.message = "";

  vm.createCategoria = function(){
    var categoria = {
      name : vm.nombre,
      descripcion : vm.descripcion || ''
    };

    meanData.addCategoria(areaId, categoria)
      .then(function(response){
        vm.response = true;
        if(response.status === 201){
          vm.error = false;
          vm.message = "Categoría creada correctamente, haga clic aquí para volver";
        } else if(response.status === 404){
          vm.error = true;
          vm.message = "No se pudo encontrar el area solicitada, la categoría no se guardó";
        } else if(response.status === 500){
          vm.error = true;
          vm.message = "Hubo un error al guardar";
        } else if(response.status === 403){
          vm.error = true;
          authentication.logout();
          $window.alert("Usted no cuenta con permiso para ver esta página, favor de contactar al administrador");
        }
      })
      .catch(function(error){
        console.log(error);
    });
  };
}
