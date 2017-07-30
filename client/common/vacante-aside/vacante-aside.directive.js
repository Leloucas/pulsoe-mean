angular.module('meanPulso').directive('vacanteAside',vacanteAside);

function vacanteAside(){
  return {
    restrict: 'EA',
    templateUrl : '/common/vacante-aside/vacante-aside.view.html',
    controller : 'vacanteAsideCtrl as vacvm'
  };
}
