'use strict';

describe('sessionInterceptor', function () {
  var apiUrl, sessionService, sessionInterceptor;

  beforeEach(inject(function(GivdoApiURL, _sessionService_, _sessionInterceptor_) {
    apiUrl = GivdoApiURL;
    sessionService = _sessionService_;
    sessionInterceptor = _sessionInterceptor_;
  }));

  describe('request', function() {
    it('adds authorization header on requests to Givdo API', function() {
      var config = { url: apiUrl, headers: {} };
      var modifiedConfig = sessionInterceptor.request(config);

      expect(modifiedConfig.headers.Authorization).toBeDefined();
    });

    it('uses user token on requests to Givdo API', function() {
      var config = { url: apiUrl, headers: {} };
      sessionService.getToken = jasmine.createSpy();
      sessionService.getToken.and.returnValue('user-token');

      var modifiedConfig = sessionInterceptor.request(config);

      expect(modifiedConfig.headers.Authorization).toEqual('Token token="user-token"');
    });

    it('does not add authorization header on requests to other urls', function() {
      var config = { url: 'http://google.com', headers: {} };
      var modifiedConfig = sessionInterceptor.request(config);

      expect(modifiedConfig.headers.Authorization).toBeUndefined();
    });
  });

  describe('response interception', function () {
    it('rejects the response', inject(function ($rootScope, sessionInterceptor) {
      var response = {
        status: 422,
        config: {url: 'anything'}
      };
      var fail = jasmine.createSpy();

      sessionInterceptor.responseError(response).then(null, fail);
      $rootScope.$digest();

      expect(fail).toHaveBeenCalled();
    }));

    it('clears the session when it is a 401 coming from the givdo api', inject(function (GivdoApiURL, session, sessionInterceptor) {
      var response = {
        status: 401,
        config: {
          url: GivdoApiURL
        }
      };

      spyOn(sessionService, 'destroy');
      sessionInterceptor.responseError(response);

      expect(sessionService.destroy).toHaveBeenCalled();
    }));

    it('does not clear the session when it is not a 401', inject(function (GivdoApiURL, session, sessionInterceptor) {
      var response = {
        status: 200,
        config: {
          url: GivdoApiURL
        }
      };

      spyOn(session, 'clear');
      sessionInterceptor.responseError(response);

      expect(session.clear).not.toHaveBeenCalled();
    }));

    it('does not clear the session when it is not coming from the givdo api', inject(function (GivdoApiURL, session, sessionInterceptor) {
      var response = {
        status: 401,
        config: {
          url: 'http://www.google.com'
        }
      };

      spyOn(session, 'clear');
      sessionInterceptor.responseError(response);

      expect(session.clear).not.toHaveBeenCalled();
    }));
  });
});
