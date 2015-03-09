angular.module('fishApp').factory('MapData', function(){
    var MapData = {};
    MapData.getCircles = function(data) {
        var circles = [], color, thisCity, cities = data.sorted, save = [];
        console.log(data);
        for(var city in cities) {
            if(cities.hasOwnProperty(city)){
                thisCity = cities[city];
                color = Please.make_color();
                circles.push([
                    thisCity.loc.lat,
                    thisCity.loc.lng,
                    1000+(thisCity.data.length*1000) *.5,
                    color,
                    0.5,
                    city
                ]);
            }
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