'use strict';

describe('ProfileCtrl', function(){
  var $scope, session, deferredPicker, controller, user;
  beforeEach(inject(function ($rootScope, $controller, $q, OrganizationPicker) {
    $scope = $rootScope.$new();
    user = jasmine.createSpyObj('user', ['relation']);
    user.relation.and.returnValue('organization');
    session = jasmine.createSpyObj('session', ['user']);
    session.user.and.returnValue($q.when(user));
    deferredPicker = $q.defer();
    spyOn(OrganizationPicker, 'open');
    OrganizationPicker.open.and.returnValue(deferredPicker.promise);

    controller = $controller('ProfileCtrl', {$scope: $scope, session: session});
    $scope.$digest();
  }));

  describe('initialization', function () {
    it('loads the user and organization into the scope', inject(function (givdo) {
      expect($scope.user).toEqual(user);
      expect($scope.organization).toEqual('organization');
    }));
  });

  describe('changeOrganization', function () {
    it('opens the picker with the current organization', inject(function (OrganizationPicker) {
      $scope.changeOrganization();

      expect(OrganizationPicker.open).toHaveBeenCalledWith('organization');
    }));

    it('updates the user organization', inject(function (givdo) {
      var organization = {id: 12345};
      $scope.changeOrganization();
      deferredPicker.resolve(organization);
      $scope.$digest();

      expect(givdo.user.update).toHaveBeenCalledWith(user, {organization_id: 12345});
    }));

    it('emits a givdo:user-updated signal', inject(function (givdo) {
      $scope.changeOrganization();
      deferredPicker.resolve({});
      givdo.user.deferred_update.resolve(user)
      var signal = jasmine.createSpy();
      $scope.$on('givdo:user-updated', signal);
      $scope.$digest();

      expect(signal).toHaveBeenCalledWith(jasmine.anything(), user);
    }));
  });
});
