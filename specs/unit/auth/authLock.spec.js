'use strict';

describe('authLock', function () {
  beforeEach(inject(function ($auth) {
    spyOn($auth, 'validateUser');
}));

  it('validates the current session', inject(function ($auth, authLock) {
    authLock('');

    expect($auth.validateUser).toHaveBeenCalled();
  }));

  describe('listens to auth callbacks to switch between signed in/out states', function () {
    var state, ionicHistory;
    beforeEach(inject(function ($q, $state, $ionicHistory, authLock) {
      state = $state;
      ionicHistory = $ionicHistory;

      spyOn(state, 'go');
      spyOn(ionicHistory, 'nextViewOptions');

      authLock('welcome');
    }));

    var assertSwitchesToLoggedInStateWhen = function (signal) {
      describe('switches to logged in state when ' + signal, function () {
        beforeEach(inject(function ($rootScope) {
          $rootScope.$broadcast(signal, {user: 'email@domain.com'});
          $rootScope.$digest();
        }));

        it('moves to the given welcome state without recording history', function () {
          expect(ionicHistory.nextViewOptions).toHaveBeenCalledWith({disableBack: true});
          expect(state.go).toHaveBeenCalledWith('welcome', {}, {reload: true});
        });
      });
    };

    var assertSwitchesToLoggedOutStateWhen = function (signal) {
      describe('switches to logged out state when ' + signal, function () {
        beforeEach(inject(function ($rootScope) {
          $rootScope.$broadcast(signal);
          $rootScope.$digest();
        }));

        it('moves to the given welcome state without recording history', function () {
          expect(ionicHistory.nextViewOptions).toHaveBeenCalledWith({disableBack: true});
          expect(state.go).toHaveBeenCalledWith('auth.login', {}, {reload: true});
        });
      });
    };

    assertSwitchesToLoggedInStateWhen('auth:registration-email-success');
    assertSwitchesToLoggedInStateWhen('auth:registration-email-success');
    assertSwitchesToLoggedInStateWhen('auth:login-success');
    assertSwitchesToLoggedInStateWhen('auth:validation-success');

    assertSwitchesToLoggedOutStateWhen('auth:logout-success');
    assertSwitchesToLoggedOutStateWhen('auth:invalid');
    assertSwitchesToLoggedOutStateWhen('auth:session-expired');
    assertSwitchesToLoggedOutStateWhen('auth:validation-error');
  });
});
