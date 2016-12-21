import 'angular';

function MenuBarController($scope) {
  let vm = this;

  vm.user = null;
  vm.setUser = setUser;
  vm.organization = null;

  $scope.$on('givdo:user-updated', (_, u) => setUser(u));

  function setUser(user) {
    vm.user = user;
    vm.organization = user.relation('organization');
  }
}

export default ['$scope', MenuBarController];
