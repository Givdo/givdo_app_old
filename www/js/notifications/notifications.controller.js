(function() {
  'use strict';

  angular
    .module('givdo.notifications')
    .controller('NotificationsController', [
      '$scope',
      'givdo',
      NotificationsController
    ]);

    function NotificationsController($scope, givdo) {
      var page;
      $scope.notifications = [];
      $scope.moreDataCanBeLoaded = true;

      function setNotifications(notifications) {
        page = notifications;
        $scope.notifications = $scope.notifications.concat(notifications);
      }

      $scope.loadMore = function() {
        if (page)
          page.next().then(setNotifications);
        else
          givdo.user.notifications().then(setNotifications);

        $scope.$broadcast('scroll.infiniteScrollComplete');
      }

      $scope.accept = function(notification) {
        console.log('accept');
      }

      $scope.reject = function(index, notification) {
        givdo.notification.reject(notification).then(function () {
          $scope.notifications.splice(index, 1);
        });
      }
    }
})();
