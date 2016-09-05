(function() {
  'use strict';

  angular
    .module('givdo.friends')
    .controller('FriendsController', [
      'givdo',
      'friends',
      FriendsController
    ]);

    function FriendsController(givdo, friends) {
      var vm = this;

      vm.maxItems = 9;
      vm.friends = friends.relation('users');
      vm.showMore = (vm.friends.length > vm.maxItems);
    }
})();
