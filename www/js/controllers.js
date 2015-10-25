(function () {
  'use strict';

  angular.module('givdo.controllers', [])

    .directive("centerCards", [function () {
      var this_height, this_width;

      return function (scope, element, attrs) {
        this_height = $(element).height();
        this_width = $(element).width();

        $(element).css("margin-left", -(this_width / 2 + 10));
        $(element).css("margin-top", -(this_height / 2));
      };
    }])

    .controller('AppCtrl', [function () { }])

    .controller("SwipeCtrl", ['$stateProvider', '$urlRouterProvider', function ($scope, $http) {
      $http.get('http://localhost:3000/api/v1/organizations').then(function (response) {
        $scope.cards = response.data;
      });

      $scope.leftSwipe = function (index) {
        //alert(index);
      };

      $scope.rightSwipe = function (index) {
        //alert(index);
      };
    }])

    .controller('PlaylistsCtrl', ['$scope', function ($scope) {
      $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
      ];
    }])

    .controller('PlaylistCtrl', [function () { }]);
})();