angular.module('fishApp').factory('MapData', function(){
    var MapData = {};
    MapData.getCircles = function(data) {
        var circles = [], color, thisCity, cities = data.sorted;
        for(var city in cities) {
            if(cities.hasOwnProperty(city)){
                thisCity = cities[city];
                if(data.total < 500) {
                    //console.log(data.total, thisCity.data.length);
                    //debugger
                }
                if(thisCity.data.length > 0) {
                    color = Please.make_color();
                    circles.push([
                        thisCity.loc.lat,
                        thisCity.loc.lng,
                        1000+(((thisCity.data.length/data.total)*1000)*500),
                        color,
                        0.5,
                        city
                    ]);
                }
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