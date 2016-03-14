'use strict';

describe('facebook.gameInvite', function () {
  var facebook, deferredFacebookDialog;
  beforeEach(inject(function ($q, $injector, $cordovaFacebook) {
    deferredFacebookDialog = $q.defer();
    spyOn($cordovaFacebook, 'showDialog');
    $cordovaFacebook.showDialog.and.returnValue(deferredFacebookDialog.promise);

    facebook = $injector.get('facebook');
  }));

  it('creates the dialog with the given message', inject(function ($cordovaFacebook) {
    facebook.gameInvite('Come play with me', 'title');

    expect($cordovaFacebook.showDialog).toHaveBeenCalledWith({
      method: 'apprequests',
      message: 'Come play with me',
      title: 'title',
      actionType: 'turn'
    });
  }));

  it('fails the promise when facebook invite fails', inject(function ($rootScope) {
    var fails = jasmine.createSpy();

    facebook.gameInvite().then(null, fails);
    deferredFacebookDialog.reject();
    $rootScope.$digest();

    expect(fails).toHaveBeenCalled();
  }));

  it('fails the promise when givdo game invitation fails', inject(function ($rootScope, givdo) {
    var fails = jasmine.createSpy();

    facebook.gameInvite().then(null, fails);
    deferredFacebookDialog.resolve({});
    givdo.game.deferred_versus.reject();
    $rootScope.$digest();

    expect(fails).toHaveBeenCalled();
  }));

  it('creates the game and returns the object when all succeeds', inject(function ($rootScope, givdo) {
    var gameInvite = facebook.gameInvite();

    deferredFacebookDialog.resolve({to: ['facebook-id-1']});
    givdo.game.deferred_versus.resolve({id: 'game id'});
    $rootScope.$digest();

    expect(givdo.game.versus).toHaveBeenCalledWith({uid: 'facebook-id-1'});
    expect(gameInvite).toResolveTo({id: 'game id'});
  }));
});
