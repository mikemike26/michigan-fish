angular.module('fishApp').directive('fishAppWrapper', function(AnglerData, CityData, MapData) {
   return {
       restrict: 'C',
       replace: true,
       templateUrl: 'templates/directives/fishAppWrapper.html',
       link: function(scope, element, attrs) {
           var options, circles, circle = [], itemsByCity, items, filterCities, map;
           var howMany = function(e) {
               var city
               if(filterCities) {
                   city = filterCities.sorted[e.target.options.city];
               }else {
                   city = itemsByCity.sorted[e.target.options.city];
               }
               scope.hoverMsg = e.target.options.city+': '+city.data.length+' records';
               scope.$apply();
           },
               removePopup = function(e) {
                   scope.hoverMsg = "";
                   scope.$apply();
               },
               displayContents = function(e) {
                   if(filterCities) {
                       scope.contents = filterCities.sorted[e.target.options.city].data;
                   }else {
                       scope.contents = itemsByCity.sorted[e.target.options.city].data;
                   }
                   scope.city = e.target.options.city;
                   scope.$apply();
               },
               renderMap = function(items) {
                   itemsByCity = items;
                   console.log(itemsByCity);
                   scope.species = options.species;
                   //initialize the map on the "map" div with a given center and zoom
                   map = L.map('map', {
                       center: [42.717585, -84.5555347],
                       zoom: 6
                   });
                   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                       minZoom: 6
                   }).addTo(map);
                   renderCircles(itemsByCity);
               },
               renderCircles = function(items) {
                   circles = MapData.getCircles(items);
                   for (var i = 0; i < circles.length; i++) {
                       circle.push({});
                       circle[i] = new L.circle([circles[i][0], circles[i][1]], circles[i][2], {
                           color: circles[i][3],
                           fillColor: circles[i][3],
                           fillOpacity: circles[i][4],
                           city: circles[i][5]
                       }).addTo(map).on('mouseover',howMany).on('mouseout', removePopup).on('click', displayContents);
                   }
               },
               removeCircles = function() {
                   for(var i= 0, j=circle.length; j>i; i++) {
                       map.removeLayer(circle[i]);
                   }
               },
               updateMap = function(items) {
                   removeCircles();
                   renderCircles(items);
               };
            scope.hoverMsg = "";
            scope.contents = [];
            scope.species = [];
            scope.selectedOptions = "";
            AnglerData.getAll().then(function(data) {
                options = AnglerData.getOptions(data);
                items = AnglerData.sortByOption(options, "angler_s_city", data);
                renderMap(items);
            });
           scope.$watch('selectedOptions', function(newValue, oldValue) {
               filterCities = AnglerData.filterByValues(items, newValue);
               console.log(filterCities);
               console.log(newValue);
               updateMap(filterCities);
           });
           scope.reset = function() {
               scope.contents = [];
               scope.selectedOptions = "";
               filterCities = false;
               updateMap(items);
           };
       }
   }
});