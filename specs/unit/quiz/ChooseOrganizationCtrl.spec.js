'use strict';

describe('ChooseOrganizationCtrl', function(){
  var $scope, $ionicSlideBoxDelegate, $state, Organization, QuizRound, controller;
  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ionicSlideBoxDelegate = jasmine.createSpyObj('$ionicSlideBoxDelegate', ['update', 'currentIndex']);
    $state = jasmine.createSpyObj('$state', ['go']);
    Organization = jasmine.createSpyObj('Organization', ['query']);
    QuizRound = jasmine.createSpyObj('QuizRound', ['playFor']);

    controller = function () {
      var controller = $controller('ChooseOrganizationCtrl', {
        $scope: $scope, $ionicSlideBoxDelegate: $ionicSlideBoxDelegate, $state: $state,
        Organization: Organization, QuizRound: QuizRound
      });
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

  describe('.slideChanged (infinite pagination)', function () {
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

  describe('.selectOrganization', function () {
    it('sets the current organization on the QuizRound', function () {
      controller();
      $scope.organizations = ['organization'];
      $ionicSlideBoxDelegate.currentIndex.and.returnValue(0);

      $scope.selectOrganization();

      expect(QuizRound.playFor).toHaveBeenCalledWith('organization');
    });

    it('moves the app to the trivia state', function () {
      controller();

      $scope.selectOrganization();

      expect($state.go).toHaveBeenCalledWith('app.quiz.trivia');
    });
  });
});
