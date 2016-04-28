(function(){
  'use strict';

  angular.module('givdo.push', [])
         .service('RequestsService', ['$http', '$q', '$ionicLoading',  RequestsService]);

  function RequestsService($http, $q, $ionicLoading){
    var base_url = 'http://192.168.0.13:3000/api/v1';
    // var base_url = 'https://givdo-staging.herokuapp.com/api/v1';

    function register(token){
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': 'Token token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiQkFoN0NFa2lDR2RwWkFZNkJrVlVTU0lpWjJsa09pOHZaMmwyWkc4dFlYQnBMWE5sY25abGNpOVZjMlZ5THpNR093QlVTU0lNY0hWeWNHOXpaUVk3QUZSSklneGtaV1poZFd4MEJqc0FWRWtpRDJWNGNHbHlaWE5mWVhRR093QlVTU0lkTWpBeE5pMHdOUzB5TmxReE5Eb3hORG8xT0M0ME5UWmFCanNBVkE9PS0tOWIzM2ViNzY1ODhlMjQ4ODY4NzNhZGIxZWRmN2RmMDI4Y2QxODk5OCIsImV4cCI6MTQ2MTY4NjQwMn0.V4xd9ZePfOi7JPms8HFGxTpMzwkkSqOcG-iy9tbfujg"'
        },
      };

      $ionicLoading.show();

      $http.post(base_url + '/devices', { token: token, platform: 'android' }, config)
           .success(function(response){
             $ionicLoading.hide();
             deferred.resolve(response);
           })
           .error(function(data){
             alert('error!!!' + data);
             deferred.reject();
           });

           return deferred.promise;
    };

    return {
      register: register
    };
  }
})();
