'use strict';

describe('facebook.gameInvite', function () {
  var facebook, deferredFacebookDialog, deferredGameInvite;
  beforeEach(inject(function ($q, $injector, $cordovaFacebook, GameRepo) {
    deferredFacebookDialog = $q.defer();
    spyOn($cordovaFacebook, 'showDialog');
    $cordovaFacebook.showDialog.and.returnValue(deferredFacebookDialog.promise);

    deferredGameInvite = $q.defer();
    spyOn(GameRepo, 'create');
    GameRepo.create.and.returnValue(deferredGameInvite.promise);

    facebook = $injector.get('facebook');
  }));

  it('creates the dialog with the given message', inject(function ($cordovaFacebook) {
    facebook.gameInvite('Come play with me');

    expect($cordovaFacebook.showDialog).toHaveBeenCalledWith({
      method: 'apprequests',
      message: 'Come play with me'
    });
  }));

  it('fails the promise when facebook invite fails', inject(function ($rootScope) {
    var fails = jasmine.createSpy();

    facebook.gameInvite().then(null, fails);
    deferredFacebookDialog.reject();
    $rootScope.$digest();

    expect(fails).toHaveBeenCalled();
  }));

  it('fails the promise when givdo game invitation fails', inject(function ($rootScope) {
    var fails = jasmine.createSpy();

    facebook.gameInvite().then(null, fails);
    deferredFacebookDialog.resolve({});
    deferredGameInvite.reject();
    $rootScope.$digest();

    expect(fails).toHaveBeenCalled();
  }));

  it('creates the game and returns the object when all succeeds', inject(function ($rootScope, GameRepo) {
    var succeeds = jasmine.createSpy();

    facebook.gameInvite().then(succeeds);
    deferredFacebookDialog.resolve({to: ['facebook-id-1', 'facebook-id-2']});
    deferredGameInvite.resolve({id: 'game id'});
    $rootScope.$digest();

    expect(GameRepo.create).toHaveBeenCalledWith({provider: 'facebook', invitees: ['facebook-id-1', 'facebook-id-2']});
    expect(succeeds).toHaveBeenCalledWith({id: 'game id'});
  }));
});
