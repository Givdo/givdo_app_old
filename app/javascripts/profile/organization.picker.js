(function() {
  'use strict';

  angular
    .module('givdo.profile')
    .factory('OrganizationPicker', [
      '$ionicModal',
      '$rootScope',
      '$ionicHistory',
      '$q',
      OrganizationPicker
    ]);

    function OrganizationPicker($ionicModal, $rootScope, $ionicHistory, $q) {
      var service = {
        open: open,
      };

      return service;

      function open() {
        return createModal($rootScope.$new());
      }

      function createModal(scope) {
        var promise = $q(function(select, cancel) {
          scope.cancel = cancel;
          scope.select = select;
        });

        scope.$historyId = $ionicHistory.currentHistoryId();

        return $ionicModal
          .fromTemplateUrl('templates/util/choose-organization.html', { scope: scope })
          .then(function(modal) {
            modal.show();

            return promise.finally(modal.remove);
          });
      }
    }

})();
