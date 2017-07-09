angular.module('meanPulso').controller('navigationUserCtrl',navigationUserCtrl);

navigationUserCtrl.$inject = ['$location', 'authentication'];
function navigationUserCtrl($location, authentication){
  var vm = this;

  vm.isLoggedIn = authentication.isLoggedIn();

  vm.currentUser = authentication.currentUser();

  vm.error = false;
  vm.errormessage = "";

  // vm.credentials = {
  //   email : "",
  //   password : ""
  // };
  //
  // vm.login = function(){
  //   if(!vm.credentials.email || !vm.credentials.password){
  //     vm.error = true;
  //     vm.errormessage = "Llene todos los campos";
  //   } else {
  //     vm.error = false;
  //     authentication
  //       .login(vm.credentials)
  //       .catch(function(err){
  //         console.log(err);
  //         alert(err);
  //       })
  //       .then(function(data){
  //         if (data.status !== 200) {
  //           vm.error = true;
  //           vm.errormessage = "Usuario o contraseña incorrectos";
  //         } else {
  //           // console.log("logeado papu");
  //           $location.path('/perfil');
  //         }
  //       });
  //   }
  // };

  vm.logout = function(){
    var answer = confirm("Está a punto de cerrar sesión.\n¿Desea continuar?");
    if (answer) {
      authentication.logout();
      console.log("deslogueado papu");
    }
  };
}
