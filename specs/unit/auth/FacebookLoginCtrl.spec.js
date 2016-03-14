'use strict';

describe('FacebookLoginCtrl', function(){
  var $scope, $ionicPopup, facebook, controller, loginDefer;
  beforeEach(inject(function ($rootScope, $controller, $q, resource) {
    $scope = $rootScope.$new();
    loginDefer = $q.defer();
    facebook = jasmine.createSpyObj('facebook service', ['login']);
    facebook.login.and.returnValue(loginDefer.promise);
    $ionicPopup = jasmine.createSpyObj('$ionicPopup', ['alert'])

    controller = function () {
      return $controller('FacebookLoginCtrl', {
        $scope: $scope,
        $ionicPopup: $ionicPopup,
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

    it('sets the session token', inject(function (session, testSession) {
      session.clear();

      controller();

      $scope.facebookLogin();
      loginDefer.resolve(testSession)

      expect(session()).toResolveTo(testSession);
    }));

    it('authenticates with the facebook provider', inject(function (resource) {
      controller();

      $scope.facebookLogin();
      loginDefer.reject(resource({attributes: {message: 'Error message from server'}}));
      $scope.$digest();

      expect($ionicPopup.alert).toHaveBeenCalledWith({
        title: 'Uh, oh!',
        template: 'Error message from server'
      });
    }));
  });
});
