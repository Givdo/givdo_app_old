'use strict';

describe('FacebookLoginCtrl', function(){
  var $scope, $ionicPopup, facebook, controller, loginDefer, session;
  beforeEach(inject(function ($rootScope, $controller, $q) {
    $scope = $rootScope.$new();
    loginDefer = $q.defer();
    facebook = jasmine.createSpyObj('facebook service', ['login']);
    facebook.login.and.returnValue(loginDefer.promise);
    session = jasmine.createSpyObj('session', ['token']);
    $ionicPopup = jasmine.createSpyObj('$ionicPopup', ['alert'])

    controller = function () {
      return $controller('FacebookLoginCtrl', {
        $scope: $scope,
        $ionicPopup: $ionicPopup,
        session: session,
        facebook: facebook
      });
    };
  }));

  describe('facebookLogin()', function () {
    it('authenticates with the facebook provider', function () {
      controller();

      $scope.facebookLogin();

      expect(facebook.login).toHaveBeenCalled();
    });

    it('sets the session token', function () {
      controller();

      $scope.facebookLogin();
      loginDefer.resolve({token: '1234'})
      $scope.$digest();

      expect(session.token).toHaveBeenCalledWith('1234');
    });

    it('authenticates with the facebook provider', function () {
      controller();

      $scope.facebookLogin();
      loginDefer.reject({data: {error: 'Error message from server'}})
      $scope.$digest();

      expect($ionicPopup.alert).toHaveBeenCalledWith({
        title: 'Uh, oh!',
        template: 'Error message from server'
      });
    });
  });
});
