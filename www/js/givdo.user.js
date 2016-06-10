(function () {
  'use strict';

  angular
    .module('givdo.user', ['givdo.api', 'givdo.auth', 'givdo.util'])
    .config(config)
    .controller('NotificationCtrl', NotificationCtrl)
    .controller('ActivityCtrl', ActivityCtrl)
    .controller('ProfileCtrl', ProfileCtrl)
    .controller('FriendsCtrl', FriendsCtrl)
    .controller('ModalCausesCtrl', ModalCausesCtrl);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
      $stateProvider
        .state('notification', {
          url: '/notification',
          parent: 'app',
          views: {
            'notification-content': {
              templateUrl: 'templates/user/notification.html',
              controller: 'NotificationCtrl'
            }
          }
        })
        .state('activity', {
          url: '/activity',
          parent: 'app',
          views: {
            'activity-content': {
              templateUrl: 'templates/user/activity.html',
              controller: 'ActivityCtrl'
            }
          }
        })
        .state('friends', {
          url: '/friends',
          parent: 'app',
          views: {
            'friends-content': {
              templateUrl: 'templates/user/friends.html',
              controller: 'FriendsCtrl'
            }
          }
        })
        .state('profile', {
          url: '/profile',
          parent: 'app',
          cache: false,
          reload: true,
          views: {
            'profile-content': {
              templateUrl: 'templates/user/profile.html',
              controller: 'ProfileCtrl'
            }
          }
        });
    }

    NotificationCtrl.$inject = ['$scope', 'givdo'];

    function NotificationCtrl($scope, givdo) {
      var setActivities = function (feed) {
        $scope.totalScore = feed.attr('total_score');
        $scope.activities = feed.relation('activities');
      };

      $scope.$on('$ionicView.enter', function () {
        givdo.user.activities().then(setActivities);
      });

      $scope.activityNameToLabel = function (name) {
        return (name === 'won_scores') ? 'You Won' : 'You Lose';
      }
    }

    ActivityCtrl.$inject = ['$scope', 'givdo'];

    function ActivityCtrl($scope, givdo) {
      var setActivities = function (feed) {
        $scope.totalScore = feed.attr('total_score');
        $scope.activities = feed.relation('activities');
      };

      $scope.$on('$ionicView.enter', function () {
        givdo.user.activities().then(setActivities);
      });

      $scope.activityNameToLabel = function (name) {
        return (name === 'won_scores') ? 'You Won' : 'You Lose';
      }
    }

    ProfileCtrl.$inject = ['$rootScope', '$scope', '$ionicModal', 'session', 'givdo', 'OrganizationPicker'];

    function ProfileCtrl($rootScope, $scope, $ionicModal, session, givdo, OrganizationPicker) {
      $scope.badges_name = ['Giver', 'Samaritan', 'Altruist', 'Benefactor', 'Patron', 'Philanthropist', 'Grantor'];

      $scope.range = function(min, max, step){
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) input.push(i);
        return input;
      };

      var setUser = function (user) {
        $scope.user = user;
        $scope.organization = user.relation('organization');
        $scope.badges = user.relation('badges');
        $scope.causes = user.relation('causes');

        $scope.$emit('givdo:user-updated', user);
      };
      session.user().then(setUser);

      $scope.changeOrganization = function () {
        OrganizationPicker.open($scope.organization).then(function (organization) {
          return givdo.user.update($scope.user, {organization_id: organization.id});
        }).then(setUser);
      };

      $ionicModal.fromTemplateUrl('templates/util/choose-cause.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
    }

    FriendsCtrl.$inject = ['$scope', 'givdo'];

    function FriendsCtrl($scope, givdo) {
      givdo.user.friends().then(function (friends) {
        $scope.friends = friends.relation('users');
        $scope.quantity = 9;
      });
    }

    ModalCausesCtrl.$inject = ['$scope', 'givdo', 'session'];

    function ModalCausesCtrl($scope, givdo, session) {
      var setCauses = function (causes) {
        $scope.causes = causes;
      };

      givdo.causes.all().then(setCauses);
    }
})();
