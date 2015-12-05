'use strict';

describe('session', function () {
  beforeEach(inject(function (localStorageService) {
    spyOn(localStorageService, 'get');
    spyOn(localStorageService, 'set');
    spyOn(localStorageService, 'remove');
  }));

  describe('token', function () {
    it('sets the current session token', inject(function (session, $rootScope, localStorageService) {
      session.token('new token');
      $rootScope.$digest();

      expect(localStorageService.set).toHaveBeenCalledWith('session.token', 'new token');
    }));

    it('returnts the current session token', inject(function (session, $rootScope, localStorageService) {
      localStorageService.get.and.returnValue('new token');

      expect(session.token()).toEqual('new token');
      expect(localStorageService.get).toHaveBeenCalledWith('session.token');
    }));

    it('emits a ession up signal when session is set', inject(function (session, $rootScope) {
      var sessionUp = jasmine.createSpy();
      $rootScope.$on('givdo:session:up', sessionUp);

      session.token('new token');
      $rootScope.$digest();

      expect(sessionUp).toHaveBeenCalled();
    }));
  });

  describe('clear', function () {
    it('is the current session token', inject(function (session, $rootScope, localStorageService) {
      session.clear();
      $rootScope.$digest();

      expect(localStorageService.remove).toHaveBeenCalledWith('session.token');
    }));

    it('emits a ession down signal when session is unset', inject(function (session, $rootScope) {
      var sessionDown = jasmine.createSpy();
      $rootScope.$on('givdo:session:down', sessionDown);

      session.clear();
      $rootScope.$digest();

      expect(sessionDown).toHaveBeenCalled();
    }));
  });
});
