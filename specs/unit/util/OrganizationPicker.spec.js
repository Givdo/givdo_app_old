'use strict';

describe('OrganizationPicker', function() {
  var modal, modalScope;

  beforeEach(inject(function ($q, $ionicModal, givdo) {
    modal = jasmine.createSpyObj('modal', ['show', 'remove']);
    spyOn($ionicModal, 'fromTemplateUrl').and.callFake(function (_, options) {
      modalScope = options.scope;
      return $q.when(modal);
    });
  }));

  describe('open', function () {
    it('opens the modal from the template', inject(function (OrganizationPicker, $ionicModal) {
      OrganizationPicker.open();

      expect($ionicModal.fromTemplateUrl).toHaveBeenCalledWith('templates/util/choose-organization.html', jasmine.anything());
    }));

    it('passes in the cancel method to reject the promise', inject(function (OrganizationPicker, $ionicModal, $rootScope) {
      var canceled = jasmine.createSpy();
      OrganizationPicker.open().then(null, canceled);
      modalScope.cancel();
      modalScope.$digest();

      expect(canceled).toHaveBeenCalled();
    }));

    it('passes in the select method to resolve the promise', inject(function (OrganizationPicker, $ionicModal, $rootScope) {
      var select = jasmine.createSpy();
      OrganizationPicker.open().then(select);
      modalScope.select('organization');
      modalScope.$digest();

      expect(select).toHaveBeenCalledWith('organization');
    }));

    it('closes the modal after canceling', inject(function (OrganizationPicker) {
      OrganizationPicker.open();

      modalScope.cancel();
      modalScope.$digest();

      expect(modal.remove).toHaveBeenCalled();
    }));

    it('closes the modal after selecting an organization', inject(function (OrganizationPicker) {
      OrganizationPicker.open();

      modalScope.select('org');
      modalScope.$digest();

      expect(modal.remove).toHaveBeenCalled();
    }));
  });
});
