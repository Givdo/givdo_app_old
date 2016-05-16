(function(){
  'use strict';

  angular
    .module('givdo.notifications', ['ionic', 'givdo.api'])
    .factory('notificationsRegister', notificationsRegister);


    function notificationsRegister() {
      var push;

      return function() {
        if (window.cordova === undefined) return;

        push = PushNotification.init({
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

          alert('registrationId: ' + data.registrationId);

          DeviceRepo.register(deviceParams).then(function(response) {
            alert('registered!');
          });
        });

        // Only for test.
        push.on('notification', function(data) {
          alert('notify: ' + data.message);
        });

        push.on('error', function(e) {
          alert('err: ' + e.message);
        });
      };
    }
})();
