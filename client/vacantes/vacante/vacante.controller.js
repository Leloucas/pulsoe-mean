angular.module('meanPulso').controller('showVacanteCtrl',showVacanteCtrl);

showVacanteCtrl.$inject = ['$rootScope', '$routeParams', '$location', 'meanData', 'authentication', '$window', '$timeout'];

function showVacanteCtrl($rootScope, $routeParams, $location, meanData, authentication, $window, $timeout){
  var vm = this;

  $rootScope.header = "Vacante";

  var vacanteId = $routeParams.vacanteId;

  var userId;
  if(authentication.currentUser()){
    userId = authentication.currentUser()._id;
  }

  vm.already = false;

  vm.vacante = {};

  meanData.getOneVacante(vacanteId)
    .then(function(response){
      if(response.status === 200){
        vm.vacante = response.data;
        if(vm.vacante.users){
          checkUser(vm.vacante.users);
        } else {
          vm.already = false;
        }
      } else if(response.status === 500){
        console.log(response);
      }
    })
    .catch(function(error){
      console.log(error);
  });

  if(authentication.currentUser()){
    vm.lv = authentication.currentUser().level;
  } else {
    vm.lv = '';
  }

  function checkUser(users){
    for(key in users){
      if(users[key]._id === userId){
        vm.already = true;
        break;
      } else {
        vm.already = false;
      }
    }
  }

  vm.apply = function(){
    var user = {
      _id : userId
    };
    meanData.vacanteApply(vacanteId)
      .then(function(response){
        console.log(response);
        if(response.status === 201){
          $window.alert("¡Usted se ha postulado exitosamente!");
          $window.location.reload();
        } else if(response.status === 409){
          $window.alert(response.data.message);
        }
      })
      .catch(function(error){
        console.log(error)
    });

    // $window.alert("Postulado papu");
  };

}
