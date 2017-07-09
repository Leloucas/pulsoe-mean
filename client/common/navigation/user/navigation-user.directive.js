angular.module('meanPulso').directive('navigationUser',navigationUser);

function navigationUser(){
  return {
    restrict: 'EA',
    templateUrl : '/common/navigation/user/navigation-user.view.html',
    controller : 'navigationUserCtrl as navvm'
  };
}
