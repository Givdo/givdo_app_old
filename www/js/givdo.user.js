(function () {
  'use strict';

  angular
    .module('givdo.user', ['givdo.api', 'givdo.auth', 'givdo.util', 'checklist-model', 'ui.router'])
    .config(config)
    .controller('ActivityCtrl', ActivityCtrl)
    .controller('FriendShowCtrl', FriendShowCtrl)
    .controller('ProfileCtrl', ProfileCtrl)
    .controller('FriendsCtrl', FriendsCtrl)
    .controller('ModalCausesCtrl', ModalCausesCtrl);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
      $stateProvider
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
        .state('friend', {
          url: '/friend/show/:friendId',
          parent: 'app',
          views: {
            'friends-content': {
              templateUrl: 'templates/user/friend_show.html',
              controller: 'FriendShowCtrl'
            }
          },
          resolve:{
            friendId: ['$stateParams', function($stateParams){
              return $stateParams.friendId;
            }]
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
          cache: true,
          views: {
            'profile-content': {
              templateUrl: 'templates/user/profile.html',
              controller: 'ProfileCtrl'
            }
          }
        });
    }

    NotificationCtrl.$inject = ['$scope', 'givdo', 'QuizRound'];

    function NotificationCtrl($scope, givdo, QuizRound) {
      var page = 0;
      $scope.notifications = [];
      $scope.moreDataCanBeLoaded = true;

      $scope.loadMore = function(){
        page++

        givdo.user.notifications('?page[number]=' + page + '&page[size]=10').then(function(notifications) {
          $scope.notifications = $scope.notifications.concat(notifications);

          notifications.last().then(function(){})
          .catch(function(){
            $scope.moreDataCanBeLoaded = false;
          });

          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      };

      $scope.accept = function(notification) {
        givdo.notification.accept(notification).then(function() {
          console.log('accept');
          // QuizRound.continue(notification.relation('game'));
        });
      }

      $scope.reject = function(notification) {
        givdo.notification.reject(notification).then(function () {
          $scope.notifications = $scope.notifications.filter(function (item) {
            return item.id != notification.id;
          });
        });
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

    FriendShowCtrl.$inject = ['$cordovaKeyboard', '$scope', '$state', '$http', '$cordovaFacebook', '$stateParams', 'givdo', 'sessionService'];

    function FriendShowCtrl($cordovaKeyboard, $scope, $state, $http, $cordovaFacebook, $stateParams, givdo, sessionService) {
      $scope.goBack = function() {
        $state.go('friends', {});
      };

      var FACEBOOK_APP_ID = "558889160934969",
          FACEBOOK_APP_SECRET = "a8cc1e2ee43e949af1ffd62a8f86186c";

      givdo.user.get_friend($stateParams.friendId).then(function(friend){
        $scope.user = friend;
        $scope.causes = friend.relationships.causes.data;
        $scope.badges = friend.relationships.badges.data;

        var url_cover = "https://graph.facebook.com/" + friend.attr('uid') + "?fields=cover&access_token=" + FACEBOOK_APP_ID + "|" + FACEBOOK_APP_SECRET;

        $http.get(url_cover)
          .success(function(response){
            $scope.user.cover = response.cover.source;
          })
          .catch(function(error){
            console.log('error', error)
          });
      });
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

    ModalCausesCtrl.$inject = ['$scope', 'givdo', 'UserRepository', 'session'];

    function ModalCausesCtrl($scope, givdo, UserRepository, session) {
      var setUser = function (user) {
        $scope.user = user;
        $scope.user.causes = user.relation('causes');
      }

      session.user().then(setUser);

      var setCauses = function (causes) {
        $scope.causes = causes;
      };

      givdo.causes.all().then(setCauses);

      $scope.saveCauses = function(causes) {
        var ids = []

        causes.forEach(function (cause) {
          ids.push(Number(cause.id));
        });

        UserRepository.causes({id: ids}).then(function(data){
          $scope.$parent.$parent.$parent.causes = data;
          $scope.modal.hide();
        });
      };

      $scope.hideCauses = function(causes){
        $scope.modal.hide();
      }
    }
})();
