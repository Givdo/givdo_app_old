(function () {
  'use strict';

  angular
    .module('givdo.user', ['givdo.api', 'givdo.auth', 'givdo.util', 'checklist-model', 'ui.router'])
    .config(config)
    .controller('ActivityCtrl', ActivityCtrl)
    .controller('ProfileCtrl', ProfileCtrl)
    .controller('ModalCausesCtrl', ModalCausesCtrl);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
      $stateProvider
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


    ActivityCtrl.$inject = ['$scope', 'givdo', 'feed'];

    function ActivityCtrl($scope, givdo, feed) {
      var vm = this;
      var totalScore = feed.attr('total_score') || 0;

      vm.totalScore = (totalScore/100).toFixed(2);
      vm.activities = feed.relation('activities');
      vm.hasActivities = !!vm.activities.length;

      $scope.activityNameToLabel = function (name) {
        return (name === 'won_scores') ? 'You Won' : 'You Lose';
      }
    }

    FriendShowCtrl.$inject = ['$cordovaKeyboard', '$scope', '$state', '$http', '$cordovaFacebook', '$stateParams', 'givdo', 'sessionService'];

    function FriendShowCtrl($cordovaKeyboard, $scope, $state, $http, $cordovaFacebook, $stateParams, givdo, sessionService) {
      $scope.goBack = function() {
        $state.go('friends', {});
      };

      var FACEBOOK_APP_ID = "558889160934969";

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
