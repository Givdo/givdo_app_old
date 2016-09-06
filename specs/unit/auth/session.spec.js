'use strict';

describe('session', function () {
  var sessionData, sessionUser;
  beforeEach(inject(function (resource, session) {
    sessionUser = {id: '1234'};
    sessionData = resource({id: 'user-token', relationships: {user: {data: sessionUser}}});
    session.clear();
  }));

  describe('user', function () {
    it('is the current user when set', inject(function (session, $rootScope) {
      var user = jasmine.createSpy();
      session.user().then(user);

      session(sessionData);
      $rootScope.$digest();

      expect(user).toHaveBeenCalledWith(jasmine.objectContaining(sessionUser));
    }));
  });

  describe('token', function () {
    it('is the current session token when set', inject(function (session, $rootScope) {
      var token = jasmine.createSpy();
      session.token().then(token);

      session(sessionData);
      $rootScope.$digest();

      expect(token).toHaveBeenCalledWith('user-token');
    }));
  });

  describe('clear', function () {
    it('emits a ession down signal when session is unset', inject(function (session, $rootScope) {
      var sessionDown = jasmine.createSpy();
      $rootScope.$on('givdo:session:down', sessionDown);

      session.clear();
      $rootScope.$digest();

      expect(sessionDown).toHaveBeenCalled();
    }));
  });
});
