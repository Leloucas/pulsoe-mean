angular.module('meanPulso').controller('navigationAdminCtrl',navigationAdminCtrl);

navigationAdminCtrl.$inject = ['$location', 'authentication'];
function navigationAdminCtrl($location, authentication){
  var vm = this;

  vm.isLoggedIn = authentication.isLoggedIn();

  vm.currentUser = authentication.currentUser();

  vm.error = false;
  vm.errormessage = "";

  vm.hidden = true;
  vm.showSidebar = true;

  vm.tasks = 0;

  vm.logout = function(){
    var answer = confirm("Está a punto de cerrar sesión.\n¿Desea continuar?");
    if (answer) {
      authentication.logout();
      console.log("deslogueado papu");
    }
  };

  vm.isActiveTab = function(url){
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  };
}
