'use strict';

describe('FacebookLoginCtrl', function(){
  var $scope, $auth, controller;
  beforeEach(inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $auth = jasmine.createSpyObj('$auth service', ['authenticate']);

    controller = function () {
      var controller = $controller('FacebookLoginCtrl', {$scope: $scope, $auth: $auth});
      $scope.$digest();
      return controller;
    };
  }));

  describe('facebookLogin()', function () {
    it('authenticates with the facebook provider', function () {
      controller();

      $scope.facebookLogin();

      expect($auth.authenticate).toHaveBeenCalledWith('facebook');
    });
  });
});
