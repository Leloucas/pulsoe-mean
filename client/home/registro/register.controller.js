angular.module('meanPulso').controller('registerCtrl',registerCtrl);

registerCtrl.$inject = ['$location', 'authentication', '$rootScope'];
function  registerCtrl($location, authentication, $rootScope){
  var vm = this;

  $rootScope.header = "Registro";

  vm.credentials = {
    name : "",
    lastname : "",
    email : "",
    password : ""
  };

  vm.exists = false;

  vm.error = false;

  vm.onSubmit = function(){
    if(!vm.credentials.name || !vm.credentials.lastname ||  !vm.credentials.email || !vm.credentials.password){
      vm.error = true;
      vm.errormessage = "Llene todos los campos";
    } else {
      vm.error = false;
      console.log('Enviando registro...');
      authentication
        .register(vm.credentials)
        .catch(function(err){
          alert(err);
          console.log(err);
        })
        .then(function(data){
          if (data.data.code === 11000 || data.data.code === 11001) {
            vm.error = true;
            vm.errormessage = "El correo electrónico ya se encuentra registrado";
          } else {
            if (data.status !== 201){
              vm.error = true;
              vm.errormessage = "Error al registrar usuario";
            } else {
              // console.log("registrado papu");
              $location.path('/perfil');
            }
          }
        });
    }
  };

}
