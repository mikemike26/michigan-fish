angular.module('fishApp').directive('fishAppWrapper', function(AnglerData, CityData, MapData) {
   return {
       restrict: 'C',
       replace: true,
       templateUrl: 'templates/directives/fishAppWrapper.html',
       link: function(scope, element, attrs) {
           var options, cities, circles, circle;
            AnglerData.getAll().then(function(data) {
                options = AnglerData.getOptions(data);
            });
           //initialize the map on the "map" div with a given center and zoom
           var map = L.map('map', {
               center: [42.717585, -84.5555347],
               zoom: 6
           });
           L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
               attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
               minZoom: 6
           }).addTo(map);
           circles = MapData.getCircles();
           for (var i = 0; i < circles.length; i++) {
               circle = new L.circle([circles[i][0], circles[i][1]], circles[i][2], {
                   fillColor: circles[i][3],
                   fillOpacity: circles[i][4]
               }).addTo(map);
           }
       }
   }
});