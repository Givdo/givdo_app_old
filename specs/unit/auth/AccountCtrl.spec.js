'use strict';

describe('AccountCtrl', function(){
  var $scope, $auth, $ionicPopup, controller, deferredIonicPopup;
  beforeEach(inject(function ($rootScope, $controller, $q){
    $scope = $rootScope.$new();
    $auth = jasmine.createSpyObj('$auth service', ['signOut', 'invalidateTokens']);
    $ionicPopup = jasmine.createSpyObj('$ionicPopup', ['confirm']);
    deferredIonicPopup = $q.defer();
    $ionicPopup.confirm.and.returnValue(deferredIonicPopup.promise);

    controller = function () {
      var controller = $controller('AccountCtrl', {$scope: $scope, $auth: $auth, $ionicPopup: $ionicPopup});
      $scope.$digest();
      return controller;
    };
  }));

  describe('logout()', function () {
    it('displays a confirmation prior to logout', function () {
      controller();

      $scope.logout();

      expect($ionicPopup.confirm).toHaveBeenCalledWith({
        title: 'Logout?',
        template: 'Are you sure you want to sign out Givdo?'
      });
      expect($auth.signOut).not.toHaveBeenCalled();
    });

    it('log out the user when they confirm', inject(function ($q) {
      $auth.signOut.and.returnValue($q.when());
      controller();

      $scope.logout();
      deferredIonicPopup.resolve(true);
      $scope.$digest();

      expect($auth.signOut).toHaveBeenCalled();
      expect($auth.invalidateTokens).toHaveBeenCalled();
    }));

    it('does not log out when the user cancel', function () {
      controller();

      $scope.logout();
      deferredIonicPopup.resolve(false);
      $scope.$digest();

      expect($auth.signOut).not.toHaveBeenCalled();
    });
  });
});
