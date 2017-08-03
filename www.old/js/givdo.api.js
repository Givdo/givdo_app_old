(function () {
  'use strict';

  angular
    .module('givdo.api')
    .factory('givdo', givdo);

    givdo.$inject = [
      'OAuthRepository',
      'UserRepository',
      'GameRepository',
      'OrganizationRepository',
      'DeviceRepository',
      'CauseRepository',
      'NotificationRepository',
    ];

    function givdo(Oauth, UserRepo, GameRepo, OrganizationRepo, DeviceRepository, CauseRepository, NotificationRepository) {
      return {
        oauth: Oauth,
        user: UserRepo,
        game: GameRepo,
        device: DeviceRepository,
        organizations: OrganizationRepo,
        causes: CauseRepository,
        notification: NotificationRepository,
      };
    }

})();
