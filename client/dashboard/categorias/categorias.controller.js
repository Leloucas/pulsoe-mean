angular.module('meanPulso').controller('categoriaCtrl', categoriaCtrl);

categoriaCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'authentication', 'meanData' , '$window'];

function categoriaCtrl($rootScope, $routeParams, $location, authentication, meanData , $window){
  var vm = this;

  $rootScope.header = "Categorías";

  vm.categorias = [];
  vm.error = false;
  vm.message = "";
  vm.response = false;

  vm.areaId = $routeParams.areaId;

  meanData.getCategorias(vm.areaId)
    .then(function(response){
      if(response.status === 200){
        vm.categorias = response.data;
        vm.response = false;
      } else if(response.status === 500){
        console.log(response);
        vm.error = true;
        vm.response = true;
        vm.message = "Error al buscar las categorías";
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

  vm.sort = function(keyname){
    vm.sortKey = keyname;
    vm.reverse = !vm.reverse;
  };

  vm.deleteCategoria = function(categoria){
    var choice = $window.confirm("Está a punto de borrar esta categoría.\nESTA ACCIÓN NO SE PUEDE DESHACER.\n¿Desea continuar?");
    if(choice){
      var cat = vm.categorias.indexOf(categoria);
      var catId = categoria._id;
      meanData.deleteCategoria(vm.areaId, catId)
        .then(function(response){
          if(response.status === 204){
            $window.alert("Categoría borrada exitosamente");
            vm.categorias.splice(cat, 1);
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
    }
  };
}
