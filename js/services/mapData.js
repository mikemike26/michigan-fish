angular.module('fishApp').factory('MapData', function(CityData){
    var MapData = {};
    MapData.getCircles = function() {
        var cities = CityData.getCoords(), circles = [];
        console.log(cities);
        for(var i= 0, j=cities.length; j>i; i++) {
            circles.push([
                cities[i].loc.results[0].geometry.location.lat,
                cities[i].loc.results[0].geometry.location.lng,
                1000,
                Please.make_color(),
                0.5
            ]);
        }
        return circles;
    };

    return MapData;
});

//var circle = L.circle([51.508, -0.11], 500, {
//    color: 'red',
//    fillColor: '#f03',
//    fillOpacity: 0.5
//}).addTo(map);

//Please.make_color();