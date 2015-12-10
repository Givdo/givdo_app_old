'use strict';

describe('facebook.gameInvite', function () {
  var facebook, deferredFacebookDialog, deferredGameInvite;
  beforeEach(inject(function ($q, $injector, $cordovaFacebook, Game) {
    deferredFacebookDialog = $q.defer();
    spyOn($cordovaFacebook, 'showDialog');
    $cordovaFacebook.showDialog.and.returnValue(deferredFacebookDialog.promise);

    deferredGameInvite = $q.defer();
    deferredGameInvite.$promise = deferredGameInvite.promise;
    spyOn(Game, 'invite');
    Game.invite.and.returnValue(deferredGameInvite);

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

  it('creates the game and returns the object when all succeeds', inject(function ($rootScope, Game) {
    var succeeds = jasmine.createSpy();

    facebook.gameInvite().then(succeeds);
    deferredFacebookDialog.resolve({to: ['facebook-id-1', 'facebook-id-2']});
    deferredGameInvite.resolve({id: 'game id'});
    $rootScope.$digest();

    expect(Game.invite).toHaveBeenCalledWith({provider: 'facebook', invitees: ['facebook-id-1', 'facebook-id-2']});
    expect(succeeds).toHaveBeenCalledWith({id: 'game id'});
  }));
});
