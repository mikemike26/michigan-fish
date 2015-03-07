angular.module('fishApp').directive('fishAppWrapper', function(AnglerData) {
   return {
       restrict: 'C',
       replace: true,
       templateUrl: 'templates/directives/fishAppWrapper.html',
       link: function(scope, element, attrs) {
            AnglerData.getAll().then(function(data) {
                console.log(data);
                console.log(AnglerData.getOptions(data));
            });
       }
   }
});