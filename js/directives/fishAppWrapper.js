angular.module('fishApp').directive('fishAppWrapper', function(AnglerData, CityData) {
   return {
       restrict: 'C',
       replace: true,
       templateUrl: 'templates/directives/fishAppWrapper.html',
       link: function(scope, element, attrs) {
           var options, cities;
            AnglerData.getAll().then(function(data) {
                console.log(data);
                options = AnglerData.getOptions(data);
                //CityData.getAllCityInfo(options.angler_s_city);
            });

           scope.checkCoords = function() {
               console.log(CityData.getCoords());
           }
       }
   }
});