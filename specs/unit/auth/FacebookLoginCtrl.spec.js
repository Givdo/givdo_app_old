'use strict';

describe('FacebookLoginCtrl', function(){
  var $scope, facebook, controller, loginDefer;
  beforeEach(inject(function ($rootScope, $controller, $q) {
    $scope = $rootScope.$new();
    loginDefer = $q.defer();
    facebook = jasmine.createSpyObj('facebook service', ['login']);
    facebook.login.and.returnValue(loginDefer.promise);

    controller = function () {
      return $controller('FacebookLoginCtrl', {
        $scope: $scope,
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
  });
});
