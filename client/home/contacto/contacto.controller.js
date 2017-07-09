angular.module('meanPulso').controller('ContactoController', ContactoController);

ContactoController.$inject = ['$rootScope'];
function ContactoController($rootScope){
    var vm = this;
    
    $rootScope.header = "Contacto";

    vm.name = 'pulso';

}
