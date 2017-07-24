angular.module('meanPulso').controller('editCategoriaCtrl', editCategoriaCtrl);

editCategoriaCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'authentication', 'meanData' , '$window'];

function editCategoriaCtrl($rootScope, $routeParams, $location, authentication, meanData , $window){
  var vm = this;

  $rootScope.header = "Categoría";

  vm.areaId = $routeParams.areaId;
  vm.catId = $routeParams.catId;

  vm.response = false;
  vm.error = false;
  vm.message = '';

  vm.categoria = {};

  meanData.getOneCategoria(vm.areaId, vm.catId)
    .then(function(response){
      if(response.status === 200){
        vm.categoria = response.data;
        vm.response = false;
      } else if(response.status === 500){
        console.log(response);
        vm.error = true;
        vm.response = true;
        vm.message = "Error al buscar las categorías";
      } else if(response.status === 404){
        vm.error = true;
        vm.response = true;
        vm.message = response.data.message;
      } else if(response.status === 403){
        vm.error = true;
        vm.response = true;
        $window.alert("Usted no cuenta con permiso de usuario, favor de contactar al administrador");
        authentication.logout();
      }
    })
    .catch(function(error){

  });

  vm.updateCategoria = function(){
    var categoria = {
      name : vm.categoria.name,
      descripcion : vm.categoria.descripcion
    };

    meanData.updateOneCategoria(vm.areaId, vm.catId, categoria)
      .then(function(response){
        vm.response = true;
        if(response.status === 204){
          vm.categoria = response.data;
          vm.error = false;
          vm.message = "Categoría editada correctamente. Haga clic aquí para volver";
        } else if(response.status === 500){
          console.log(response);
          vm.error = true;
          vm.response = true;
          vm.message = "Error al buscar las categorías";
        } else if(response.status === 404){
          vm.error = true;
          vm.response = true;
          vm.message = response.data.message;
        } else if(response.status === 403){
          vm.error = true;
          vm.response = true;
          $window.alert("Usted no cuenta con permiso de usuario, favor de contactar al administrador");
          authentication.logout();
        }
      })
      .catch(function(error){
        console.log(error);
    });
  };
}
