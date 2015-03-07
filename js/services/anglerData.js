angular.module('fishApp').factory('AnglerData', function($q, $http){
    var AnglerData = {};

    AnglerData.getAll = function() {
        var deferred = $q.defer(), output;
        if(!localStorage.anglers) {
            $http({
                method: 'GET',
                url: 'https://data.michigan.gov/resource/mrpa-7cvr.json?$$app_token=jRB2K51WCX4Zap4CqrI5jB3XF'
            }).success(function (data, status, headers, config) {
                localStorage.anglers = angular.toJson(data);
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                console.log("Error! "+status);
                deferred.reject(status);
            });
        }else {
            output = angular.fromJson(localStorage.anglers);
            deferred.resolve(output);
        }
        return deferred.promise;
    };
    AnglerData.updateOptionsKey = function(options, key, value) {
        var option = options[key], update=false;
        for(var i= 0, j=option.length; j>i; i++) {
            if(option[i] === value) {
                break;
            }else if((option[i] !== value) && ((i+1) === j)) {
                update = true;
            }
        }
        if(update) {
            option.push(value);
        }
        return option;
    };
    //builds different filter options 
    AnglerData.getOptions = function(data) {
        var options = {}, item;
        for(var i= 0, j=data.length; j>i; i++) {
            item = data[i];
            if(options.bait === undefined) {
                options = {
                    angler_s_city: [item.angler_s_city],
                    bait: [item.bait],
                    category: [item.category],
                    county: [item.county],
                    method: [item.method],
                    species: [item.species],
                    waterbody: [item.waterbody],
                    year: [item.year]
                }
            }else {
                //check city
                options.angler_s_city = AnglerData.updateOptionsKey(options, "angler_s_city", item.angler_s_city);
                //check bait
                options.bait = AnglerData.updateOptionsKey(options, "bait", item.bait);
                //check category
                options.category = AnglerData.updateOptionsKey(options, "category", item.category);
                //check county
                options.county = AnglerData.updateOptionsKey(options, "county", item.county);
                //check method
                options.method = AnglerData.updateOptionsKey(options, "method", item.method);
                //check species
                options.species = AnglerData.updateOptionsKey(options, "species", item.species);
                //check waterbody
                options.waterbody = AnglerData.updateOptionsKey(options, "waterbody", item.waterbody);
                //check year
                options.year = AnglerData.updateOptionsKey(options, "year", item.year);
            }
        }
        return options;
    };
    return AnglerData;
});