'use strict';

describe('WelcomeController', function() {
  var createController, controller, authService, sessionService;

  beforeEach(inject(function($controller, $q) {
    authService = jasmine.createSpyObj('authService', [
      'authenticate',
      'facebookSignIn',
    ]);
    sessionService = jasmine.createSpyObj('sessionService', ['getToken']);

    createController = function() {
      return $controller('WelcomeController', {
        authService: authService,
        sessionService: sessionService
      });
    }
  }));

  describe('when a session does not exist', function() {
    beforeEach(inject(function($q) {
      authService.authenticate.and.returnValue($q.when({}));

      controller = createController();
    }));

    it('is not loading', function() {
      expect(controller.isLoading).toBe(false);
    });

    it('does not authenticate the user', function() {
      expect(authService.authenticate).not.toHaveBeenCalled();
    });
  });

  describe('when a session is active', function() {
    beforeEach(inject(function($q) {
      authService.authenticate.and.returnValue($q.when({}));
      sessionService.getToken.and.returnValue('user-token');

      controller = createController();
    }));

    it('is loading', function() {
      expect(sessionService.getToken).toHaveBeenCalled();
      expect(controller.isLoading).toBe(true);
    });

    it('authenticates the user', function() {
      expect(authService.authenticate).toHaveBeenCalled();
    });
  });

  describe('facebookSignIn', function() {
    beforeEach(inject(function($q) {
      authService.facebookSignIn.and.returnValue($q.when({}));
      sessionService.getToken.and.returnValue(null);

      controller = createController();
    }));

    it('sets isLoading to true', function() {
      controller.facebookSignIn();

      expect(controller.isLoading).toBe(true);
    });

    it('signs up the user using facebook', function() {
      controller.facebookSignIn();

      expect(authService.facebookSignIn).toHaveBeenCalled();
    });
  });
});
