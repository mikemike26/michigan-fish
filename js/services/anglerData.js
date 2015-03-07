angular.module('fishApp').factory('AnglerData', function($q, $http){
    var AnglerData = {};

    AnglerData.getAll = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'https://data.michigan.gov/resource/mrpa-7cvr.json?$$app_token=jRB2K51WCX4Zap4CqrI5jB3XF'
        }).success(function (data, status, headers, config) {
            deferred.resolve(data);
            console.log(data);
        }).error(function (data, status, headers, config) {
            console.log("Error! "+status);
            deferred.reject(status);
        });
        return deferred.promise;
    };
    return AnglerData;
});