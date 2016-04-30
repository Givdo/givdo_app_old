(function(){
  'use strict';

  angular.module('givdo.notifications', ['ionic', 'givdo.api'])
    .service('notifications', function() {
      this.init = function() {
        if (window.cordova === undefined) return;

        var push = PushNotification.init({
          ios: {
            alert: "true",
            badge: "true",
            sound: "true"
          },
        });

        push.on('registration', function(data) {
          var deviceParams = {
            token: data.registrationId,
            platform: ionic.Platform.platform(),
          };

          alert('register: ' + data.registrationId);

          DeviceRepo.register(deviceParams).then(function(response) {
            alert('registered!');
          });
        });

        push.on('notification', function(data) {
          alert('notify: ' + data.message);
        });

        push.on('error', function(e) {
          alert('err: ' + e.message);
        });
      };

    });
})();
