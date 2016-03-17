(function () {
  'use strict';

  angular.module('givdo.util', ['givdo.api'])
    .factory('OrganizationPicker', ['$ionicModal', '$rootScope', '$ionicHistory', '$q', function ($ionicModal, $rootScope, $ionicHistory, $q) {
      var createModal = function (scope) {
        scope.$historyId = $ionicHistory.currentHistoryId(); // See https://forum.ionicframework.com/t/slidebox-getbyhandle-not-working-in-modal/13590/12
        var promise = $q(function (select, cancel) {
          scope.cancel = cancel;
          scope.select = select;
        });
        return $ionicModal.fromTemplateUrl('templates/util/choose-organization.html', {scope: scope}).then(function (modal) {
          modal.show();
          return promise.finally(function () {modal.remove();});
        });
      };

      return {
        open: function () {
          return createModal($rootScope.$new());
        }
      };
    }])

    .controller('ChooseOrganizationCtrl', ['$scope', '$ionicSlideBoxDelegate', 'givdo', function ($scope, $ionicSlideBoxDelegate, givdo) {
      var Threshold = 3;
      var page;

      var loadOrganizations = function (organizations) {
        page = organizations;
        $scope.organizations = $scope.organizations.concat(organizations);
        $ionicSlideBoxDelegate.update();
      };
      var search = function () {
        var params = $scope.searchText ? {search: {name_cont: $scope.searchText}} : {};
        givdo.organizations.query(params).then(function (organizations) {
          $scope.organizations = [];
          loadOrganizations(organizations);
        });
      };
      $scope.$watch(function () { return $scope.searchText; }, search);

      $scope.searchText = '';
      $scope.slideChanged = function (position) {
        if ($scope.organizations.length - position == Threshold) {
          page.next().then(loadOrganizations);
        }
      };
      $scope.selectOrganization = function () {
        var index = $ionicSlideBoxDelegate.currentIndex();
        var organization = $scope.organizations[index];

        $scope.select(organization);
      };
    }]);
})();
