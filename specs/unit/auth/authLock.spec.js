'use strict';

describe('authLock', function () {
  var deferredFacebookStatus;
  beforeEach(inject(function (facebook, $q) {
    spyOn(facebook, 'checkStatus');
    deferredFacebookStatus = $q.defer();
    facebook.checkStatus.and.returnValue(deferredFacebookStatus.promise);
  }));

  describe('initial check', function () {
    it('validates the current session', inject(function (facebook, authLock, loginModal) {
      authLock();

      expect(facebook.checkStatus).toHaveBeenCalled();
    }));

    it('sets the user token to session', inject(function (facebook, authLock, loginModal, session, $rootScope) {
      authLock();
      spyOn(session, 'token');

      deferredFacebookStatus.resolve({token: 'new token'});
      $rootScope.$digest();

      expect(session.token).toHaveBeenCalledWith('new token');
    }));
  });

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
