angular.module('meanPulso').directive('navigation',navigation);

function navigation(){
  return {
    restrict: 'EA',
    templateUrl : '/common/navigation/navigation.view.html',
    controller : 'navigationCtrl as navvm'
  };
}
