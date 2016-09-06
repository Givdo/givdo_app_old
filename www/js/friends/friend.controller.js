(function() {
  'use strict';

  angular
    .module('givdo.friends')
    .controller('FriendController', [
      '$state',
      'friend',
      FriendController
    ]);

    function FriendController($state, friend) {
      var vm = this;

      vm.user = friend;
      vm.goBack = goBack;
      vm.causes = friend.relation('causes');
      vm.badges = friend.relation('badges');
      vm.organization = friend.relation('organization');
      vm.hasCauses = !!vm.causes.length;
      vm.hasAchievements = !!vm.badges.length;


      function goBack() {
        $state.go('friends');
      }
    }
})();
