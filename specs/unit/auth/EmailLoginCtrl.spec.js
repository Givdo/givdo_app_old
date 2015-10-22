'use strict';

describe('EmailLoginCtrl', function(){
  var $scope, $auth, controller, deferredIonicModal;
  beforeEach(inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $auth = jasmine.createSpyObj('$auth service', ['submitLogin']);

    controller = function () {
      var controller = $controller('EmailLoginCtrl', {$scope: $scope, $auth: $auth});
      $scope.$digest();
      return controller;
    };
  }));

  describe('login()', function () {
    var deferredLogin;
    beforeEach(inject(function ($q) {
      deferredLogin = $q.defer();
      $auth.submitLogin.and.returnValue(deferredLogin.promise);
    }));

    it('authenticates the user with the given credentials', function () {
      controller();

      $scope.loginData = {email: 'john@doe.com', password: 'JohnD03!'};
      $scope.login();

      expect($auth.submitLogin).toHaveBeenCalledWith({email: 'john@doe.com', password: 'JohnD03!'});
    });

    it('alerts when the user inputs the wrong credentials', inject(function ($ionicPopup) {
      controller();

      spyOn($ionicPopup, 'alert');

      $scope.login();
      deferredLogin.reject();
      $scope.$digest();

      expect($ionicPopup.alert).toHaveBeenCalledWith({title: 'Login Failed', template: 'Please, check your credentials and try again.'});
    }));
  });
});
