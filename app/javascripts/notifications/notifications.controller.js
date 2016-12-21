import 'angular';

NotificationsController.$inject = ['$scope', 'givdo', 'QuizRound'];

function NotificationsController($scope, givdo, QuizRound) {
  var page;
  $scope.notifications = [];

  givdo.user.notifications().then(setNotifications);

  function setNotifications(notifications) {
    page = notifications;
    $scope.notifications = $scope.notifications.concat(notifications);
  }

  $scope.loadMore = function() {
    page.next().then(function (notifications) {
      setNotifications(notifications);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.accept = function(index, notification) {
    givdo.notification.accept(notification).then(function (game) {
      $scope.notifications.splice(index, 1);
      QuizRound.continue(game);
    });
  };

  $scope.reject = function(index, notification) {
    givdo.notification.reject(notification).then(function () {
      $scope.notifications.splice(index, 1);
    });
  };
}

export default NotificationsController;
