'use strict';

describe('MenuBarCtrl', function(){
  var $scope, user, controller;
  beforeEach(inject(function($rootScope, $controller, $q, session){
    $scope = $rootScope.$new();
    user = jasmine.createSpyObj('user', ['relation']);
    user.relation.and.returnValue('organization');
    spyOn(session, 'user').and.returnValue($q.when(user));

    controller = $controller('MenuBarCtrl', {$scope: $scope});
    $scope.$digest();
  }));

  describe('initialization', function () {
    it('loads the organization into the scope', function () {
      expect($scope.organization).toBe('organization');
      expect(user.relation).toHaveBeenCalledWith('organization');
    });
  });

  it('updates the organization on givdo:user-updated', inject(function ($rootScope, resource) {
    var updatedUser = resource({relationships: {organization: {data: {id: '12345'}}}})
    $scope.$emit('givdo:user-updated', updatedUser);
    $scope.$digest();

    expect($scope.organization.id).toEqual('12345');
  }));
});
