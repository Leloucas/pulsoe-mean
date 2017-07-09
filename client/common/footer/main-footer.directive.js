angular.module('meanPulso').directive('mainFooter',mainFooter);

function mainFooter(){
  return {
    restrict: 'EA',
    templateUrl : '/common/footer/main-footer.view.html'
  };
}
