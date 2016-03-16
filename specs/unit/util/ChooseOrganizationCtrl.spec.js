'use strict';

describe('ChooseOrganizationCtrl', function(){
  var $scope, $ionicSlideBoxDelegate, controller;
  beforeEach(inject(function ($q, $rootScope, $controller, givdo) {
    $scope = $rootScope.$new();
    $ionicSlideBoxDelegate = jasmine.createSpyObj('$ionicSlideBoxDelegate', ['update', 'currentIndex']);

    controller = function (organizations) {
      givdo.organizations.deferred_query.resolve(organizations || []);
      var controller = $controller('ChooseOrganizationCtrl', {
        $scope: $scope, $ionicSlideBoxDelegate: $ionicSlideBoxDelegate
      });
      $scope.$digest();
      return controller;
    };
  }));

  describe('initialization', function () {
    it('loads the first page of Organizations into the scope', inject(function (givdo) {
      controller([1, 2, 3]);

      expect(givdo.organizations.query).toHaveBeenCalledWith({});
      expect($scope.organizations).toEqual([1, 2, 3]);
      expect($ionicSlideBoxDelegate.update).toHaveBeenCalled();
    }));
  });

  describe('.slideChanged (infinite pagination)', function () {
    it('loads the next page when user approaches the end of the current', inject(function ($q, collection) {
      var organizations = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      organizations.next = jasmine.createSpy();
      organizations.next.and.returnValue($q.when([10, 11, 12]));
      controller(organizations);

      $scope.slideChanged(6); // 8th organization, in a page of 10
      $scope.$digest();

      expect(organizations.next).toHaveBeenCalled();
      expect($ionicSlideBoxDelegate.update).toHaveBeenCalled();
      expect($scope.organizations).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }));

    it('only try to load once toward the end', inject(function ($q) {
      var page1 = [1, 2, 3, 4, 5, 6, 7, 8];
      page1.next = jasmine.createSpy();
      page1.next.and.returnValue($q.when([]));
      controller(page1);

      $scope.slideChanged(4); // 6th organization in 9
      $scope.$digest();
      expect(page1.next).not.toHaveBeenCalled();
      expect($ionicSlideBoxDelegate.update.calls.count()).toEqual(1);

      $scope.slideChanged(5); // 7th organization in 9
      $scope.$digest();
      expect(page1.next).toHaveBeenCalled();
      expect($ionicSlideBoxDelegate.update.calls.count()).toEqual(2);

      $scope.slideChanged(6); // 8th organization in 9
      $scope.$digest();
      expect($ionicSlideBoxDelegate.update.calls.count()).toEqual(2);

      expect($scope.organizations).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    }));
  });

  describe('.selectOrganization', function () {
    it('resolves the current organization', function () {
      controller();
      $scope.organizations = ['organization'];
      $ionicSlideBoxDelegate.currentIndex.and.returnValue(0);

      $scope.select = jasmine.createSpy();

      $scope.selectOrganization();

      expect($scope.select).toHaveBeenCalledWith('organization');
    });
  });
});
