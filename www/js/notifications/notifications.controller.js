(function() {
  'use strict';

  angular
    .module('givdo.notifications')
    .controller('NotificationsController', [
      '$scope',
      'givdo',
      'QuizRound',
      NotificationsController
    ]);

    function NotificationsController($scope, givdo, QuizRound) {
      var page;
      $scope.notifications = [];
      $scope.moreDataCanBeLoaded = true;

      function setNotifications(notifications) {
        if (notifications.length == 0)
          $scope.moreDataCanBeLoaded = false;

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

      $scope.accept = function(index, notification) {
        givdo.notification.accept(notification).then(function (game) {
          $scope.notifications.splice(index, 1);
          QuizRound.continue(game);
        });
      }

      $scope.reject = function(index, notification) {
        givdo.notification.reject(notification).then(function () {
          $scope.notifications.splice(index, 1);
        });
      }
    }
})();
