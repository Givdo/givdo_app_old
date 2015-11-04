'use strict';

describe('ChooseOrganizationCtrl', function(){
  var $scope, $ionicSlideBoxDelegate, Organization, controller;
  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    Organization = jasmine.createSpyObj('Organization', ['query']);
    $ionicSlideBoxDelegate = jasmine.createSpyObj('$ionicSlideBoxDelegate', ['update']);

    controller = function () {
      var controller = $controller('ChooseOrganizationCtrl', {$scope: $scope, Organization: Organization, $ionicSlideBoxDelegate: $ionicSlideBoxDelegate});
      $scope.$digest();
      return controller;
    };
  }));

  describe('initialization', function () {
    it('loads the first page of Organizations into the scope', function () {
      Organization.query.and.callFake(function (args, callback) {
        expect(args.page).toEqual(1);
        callback([1, 2, 3]);
      });

      controller();

      expect($scope.organizations).toEqual([1, 2, 3]);
      expect(Organization.query).toHaveBeenCalled();
      expect($ionicSlideBoxDelegate.update).toHaveBeenCalled();
    });
  });

  describe('infinite pagination', function () {
    it('loads the next page when user approaches the end of the current', function () {
      controller();

      $scope.organizations = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      Organization.query.and.callFake(function (args, callback) {
        expect(args.page).toEqual(2);
        callback([10, 11, 12]);
      });

      $scope.slideChanged(7); // 8th organization, in a page of 10

      expect(Organization.query).toHaveBeenCalledWith({page: 2}, jasmine.any(Function));
      expect($ionicSlideBoxDelegate.update).toHaveBeenCalled();
      expect($scope.organizations).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it('continuously try to load more when toward the end', function () {
      controller();

      $scope.organizations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      Organization.query.and.callFake(function (_, callback) { callback([]); });

      $scope.slideChanged(8); // 9th organization in 12
      expect(Organization.query).not.toHaveBeenCalledWith({page: 3}, jasmine.any(Function));
      expect($ionicSlideBoxDelegate.update).not.toHaveBeenCalled();

      $scope.slideChanged(9); // 10th organization in 12
      expect(Organization.query).toHaveBeenCalledWith({page: 3}, jasmine.any(Function));
      expect($ionicSlideBoxDelegate.update).toHaveBeenCalled();

      $scope.slideChanged(10); // 11th organization in 12
      expect(Organization.query).toHaveBeenCalledWith({page: 3}, jasmine.any(Function));
      expect($ionicSlideBoxDelegate.update).toHaveBeenCalled();

      expect($scope.organizations).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });
  });
});
