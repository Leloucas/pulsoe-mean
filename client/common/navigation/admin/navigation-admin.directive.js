angular.module('meanPulso').directive('navigationAdmin',navigationAdmin);

function navigationAdmin(){
  return {
    restrict: 'EA',
    templateUrl : '/common/navigation/admin/navigation-admin.view.html',
    controller : 'navigationAdminCtrl as navvm'
  };
}
