(function () {
  'use strict';

  angular.module('givdo.controllers', ['givdo.api'])

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

    .controller("SwipeCtrl", ['$scope', 'Organization', function ($scope, Organization) {
      Organization.query(function (organizations) {
        $scope.cards = organizations;
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