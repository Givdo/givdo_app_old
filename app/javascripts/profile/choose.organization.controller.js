(function() {
  'use strict';

  angular
    .module('givdo.profile')
    .controller('ChooseOrganizationController', [
      'givdo',
      '$ionicSlideBoxDelegate',
      ChooseOrganizationController
    ]);

    function ChooseOrganizationController(givdo, $ionicSlideBoxDelegate) {
      var vm = this;
      var threshold = 3;

      vm.searchText = '';
      vm.organizations = [];
      vm.slideChanged = slideChanged;
      vm.selectOrganization = selectOrganization;

      function slideChanged(position) {
        if (vm.organizations.length - position === threshold) {
          vm.organizations
            .next()
            .then(loadOrganizations);
        }
      }

      function selectOrganization() {
        var index = $ionicSlideBoxDelegate.currentIndex();
        var organization = vm.organizations[index];

        vm.select();
      }

      function loadOrganizations(organizations) {
        vm.organizations = vm.organizations.concat(organizations);
        $ionicSlideBoxDelegate.update();
      }
    }
})();
