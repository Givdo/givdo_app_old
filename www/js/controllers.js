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

    .controller('PlaylistsCtrl', ['$scope', '$http', function ($scope, $http) {
      $scope.playlists = [];

      $http.get('http://localhost:3000/api/v1/payments/token.json').then(function (response) {
        braintree.setup(response.data.token, 'dropin', {
          container: 'payment-container',
          paymentMethodNounceReceived: function (event, nounce) {
            // send the nounce to process the payment
            console.log(nounce);
          }
        });
      });
    }])

    .controller('PlaylistCtrl', [function () { }]);
})();