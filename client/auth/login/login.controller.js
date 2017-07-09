angular.module('meanPulso').controller('loginCtrl',loginCtrl);

loginCtrl.$inject = ['$location', 'authentication'];
function loginCtrl($location, authentication){
  var vm = this;

  vm.error = false;

  vm.credentials = {
    email : "",
    password : ""
  };

  vm.onSubmit = function () {
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
            console.log("logeado papu");
            $location.path('/perfil');
          }
        });
    }
  };
}
