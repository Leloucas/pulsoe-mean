angular.module('meanPulso').controller('navigationCtrl',navigationCtrl);

navigationCtrl.$inject = ['$location', 'authentication', 'meanData', '$window'];
function navigationCtrl($location, authentication, meanData, $window){
  var vm = this;

  vm.isLoggedIn = authentication.isLoggedIn();

  vm.currentUser = authentication.currentUser();

  vm.error = false;
  vm.errormessage = "";

  vm.areas = [];

  vm.credentials = {
    email : "",
    password : ""
  };

  meanData.getAllAreas(3)
    .then(function(response){
      if(response.status === 200){
        vm.areas = response.data;
      } else if(response.status === 500){
        console.log(response);
      }
    })
    .catch(function(error){
      console.log(error);
  });

  vm.login = function(){
    if(!vm.credentials.email || !vm.credentials.password){
      vm.error = true;
      vm.errormessage = "Llene todos los campos";
    } else {
      vm.error = false;
      authentication
        .login(vm.credentials)
        .catch(function(err){
          console.log(err);
          alert(err);
        })
        .then(function(data){
          if (data.status !== 200) {
            vm.error = true;
            vm.errormessage = "Usuario o contraseña incorrectos";
          } else {
            // console.log("logeado papu");
            $window.location.reload();
            $location.path('/perfil');
          }
        });
    }
  };

  vm.logout = function(){
    authentication.logout();
  };
}
