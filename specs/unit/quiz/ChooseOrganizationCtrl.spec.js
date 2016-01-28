'use strict';

describe('ChooseOrganizationCtrl', function(){
  var $scope, $ionicSlideBoxDelegate, OrganizationRepo, QuizRound, deferredQuery, controller;
  beforeEach(inject(function ($q, $rootScope, $controller) {
    $scope = $rootScope.$new();
    deferredQuery = $q.defer();
    $ionicSlideBoxDelegate = jasmine.createSpyObj('$ionicSlideBoxDelegate', ['update', 'currentIndex']);
    OrganizationRepo = jasmine.createSpyObj('OrganizationRepo', ['query']);
    QuizRound = jasmine.createSpyObj('QuizRound', ['playFor']);
    QuizRound.playFor.and.returnValue($q.when());

    controller = function (organizations) {
      OrganizationRepo.query.and.returnValue($q.when(organizations || []));
      var controller = $controller('ChooseOrganizationCtrl', {
        $scope: $scope, $ionicSlideBoxDelegate: $ionicSlideBoxDelegate,
        OrganizationRepo: OrganizationRepo, QuizRound: QuizRound
      });
      $scope.$digest();
      OrganizationRepo.query.and.returnValue(deferredQuery.promise);
      return controller;
    };
  }));

  describe('initialization', function () {
    it('loads the first page of Organizations into the scope', function () {
      controller([1, 2, 3]);

      expect(OrganizationRepo.query).toHaveBeenCalledWith({page: 1});
      expect($scope.organizations).toEqual([1, 2, 3]);
      expect(OrganizationRepo.query).toHaveBeenCalled();
      expect($ionicSlideBoxDelegate.update).toHaveBeenCalled();
    });
  });

  describe('.slideChanged (infinite pagination)', function () {
    it('loads the next page when user approaches the end of the current', function () {
      controller([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      $scope.slideChanged(7); // 8th organization, in a page of 10
      deferredQuery.resolve([10, 11, 12]);
      $scope.$digest();

      expect(OrganizationRepo.query).toHaveBeenCalledWith({page: 2});
      expect($ionicSlideBoxDelegate.update).toHaveBeenCalled();
      expect($scope.organizations).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it('continuously try to load more when toward the end', function () {
      controller([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

      deferredQuery.resolve([]);

      $scope.slideChanged(8); // 9th organization in 12
      $scope.$digest();
      expect(OrganizationRepo.query).not.toHaveBeenCalledWith({page: 3});
      expect($ionicSlideBoxDelegate.update.calls.count()).toEqual(1);

      $scope.slideChanged(9); // 10th organization in 12
      $scope.$digest();
      expect(OrganizationRepo.query).toHaveBeenCalledWith({page: 3});
      expect($ionicSlideBoxDelegate.update.calls.count()).toEqual(2);

      $scope.slideChanged(10); // 11th organization in 12
      $scope.$digest();
      expect(OrganizationRepo.query).toHaveBeenCalledWith({page: 3});
      expect($ionicSlideBoxDelegate.update.calls.count()).toEqual(3);

      expect($scope.organizations).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });
  });

  describe('.selectOrganization', function () {
    it('sets the current organization on the QuizRound', function () {
      controller();
      $scope.organizations = ['organization'];
      $ionicSlideBoxDelegate.currentIndex.and.returnValue(0);

      $scope.selectOrganization();

      expect(QuizRound.playFor).toHaveBeenCalledWith('organization');
    });
  });
});
