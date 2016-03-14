'use strict';

describe('sessionInterceptor', function () {
  describe('request interception', function () {
    it('applies the auth token to the request if going to the givdo api and user has a token', inject(function (GivdoApiURL, session, $rootScope, sessionInterceptor) {
      var config = {
        url: GivdoApiURL,
        headers: {}
      };

      sessionInterceptor.request(config).then(function (modifiedConfig) {
        expect(modifiedConfig.headers.Authorization).toEqual('Token token="user-token"');
      });
      $rootScope.$digest();
    }));

    it('does not intercept the request if not going to the givdo api', inject(function (GivdoApiURL, session, $rootScope, sessionInterceptor) {
      var config = {
        url: 'http://www.google.com/',
        headers: {}
      };

      var modifiedConfig = sessionInterceptor.request(config);

      expect(modifiedConfig.headers.Authorization).toEqual(undefined);
    }));

    it('does not intercept the request if token is not set', inject(function (GivdoApiURL, session, $rootScope, sessionInterceptor) {
      var config = {
        url: GivdoApiURL,
        headers: {}
      };
      var modifiedConfig = jasmine.createSpy();

      session.clear();
      sessionInterceptor.request(config).then(modifiedConfig);
      $rootScope.$digest();

      expect(modifiedConfig).not.toHaveBeenCalled();
    }));
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

      spyOn(session, 'clear');
      sessionInterceptor.responseError(response);

      expect(session.clear).toHaveBeenCalled();
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
