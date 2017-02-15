import 'angular';

FriendsController.$inject = ['friends'];

function FriendsController(friends) {
  var vm = this;

  vm.maxItems = 9;
  vm.friends = friends.relation('users');
  vm.showMore = (vm.friends.length > vm.maxItems);
}

export default FriendsController;
