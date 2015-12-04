'use strict';

describe('session', function () {
  describe('token', function () {
    it('is the current session token', inject(function (session, $rootScope) {
      session.token('new token');
      $rootScope.$digest();

      expect(session.token()).toEqual('new token');
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
    it('is the current session token', inject(function (session, $rootScope) {
      session.clear();
      $rootScope.$digest();

      expect(session.token()).toEqual(null);
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
