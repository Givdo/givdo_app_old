(function () {
  'use strict';

  angular
    .module('givdo.util', ['givdo.api'])
    .factory('OrganizationPicker', OrganizationPicker)
    .controller('ChooseOrganizationCtrl', ChooseOrganizationCtrl);

    OrganizationPicker.$inject = [
      '$ionicModal',
      '$rootScope',
      '$ionicHistory',
      '$q'
    ];

    function OrganizationPicker($ionicModal, $rootScope, $ionicHistory, $q) {
      var createModal = function (scope) {
        // See https://forum.ionicframework.com/t/slidebox-getbyhandle-not-working-in-modal/13590/12
        scope.$historyId = $ionicHistory.currentHistoryId();

        var promise = $q(function (select, cancel) {
          scope.cancel = cancel;
          scope.select = select;
        });

        return $ionicModal.fromTemplateUrl(
          'templates/util/choose-organization.html',
          {scope: scope}
        ).then(function (modal) {
          modal.show();
          return promise.finally(function () {modal.remove();});
        });
      };

      return {
        open: function () {
          return createModal($rootScope.$new());
        }
      };
    }

    ChooseOrganizationCtrl.$inject = ['$scope', '$ionicSlideBoxDelegate', 'givdo'];

    function ChooseOrganizationCtrl($scope, $ionicSlideBoxDelegate, givdo) {
      var Threshold = 3;
      var page;

      $scope.searchText = '';
      $scope.slideChanged = slideChanged;
      $scope.selectOrganization = selectOrganization;

      function slideChanged(position) {
        if ($scope.organizations.length - position === Threshold) {
          page.next().then(loadOrganizations);
        }
      }

      var loadOrganizations = function (organizations) {
        page = organizations;
        $scope.organizations = $scope.organizations.concat(organizations);
        $ionicSlideBoxDelegate.update();
      };

      function selectOrganization() {
        var index = $ionicSlideBoxDelegate.currentIndex();
        var organization = $scope.organizations[index];

        $scope.select(organization);
      }

      var search = function () {
        var params = $scope.searchText ? {search: {name_cont: $scope.searchText}} : {};
        givdo.organizations.query(params).then(function (organizations) {
          $scope.organizations = [];
          loadOrganizations(organizations);
        });
      };

      $scope.$watch(function () { return $scope.searchText; }, search);
    }
})();
