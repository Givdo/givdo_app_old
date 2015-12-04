'use strict';

describe('authLock', function () {
  beforeEach(inject(function (facebook) {
    spyOn(facebook, 'checkStatus');
  }));

  it('validates the current session', inject(function (facebook, authLock, loginModal) {
    authLock();

    expect(facebook.checkStatus).toHaveBeenCalledWith(loginModal.close, loginModal.open);
  }));

  describe('listens to session callbacks to open or close the login modal', function () {
    var loginModal;
    beforeEach(inject(function (loginModal, authLock) {
      spyOn(loginModal, 'open');
      spyOn(loginModal, 'close');

      authLock();
    }));

    it('opens the login modal when session goes up', inject(function (loginModal, $rootScope) {
      $rootScope.$broadcast('givdo:session:up');
      $rootScope.$digest();

      expect(loginModal.close).toHaveBeenCalled();
    }));

    it('closes the login modal when session goes down', inject(function (loginModal, $rootScope) {
      $rootScope.$broadcast('givdo:session:down');
      $rootScope.$digest();

      expect(loginModal.open).toHaveBeenCalled();
    }));
  });
});
