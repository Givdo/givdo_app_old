// Karma configuration
// Generated on Thu Aug 27 2015 15:36:15 GMT-0300 (BRT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // External Dependencies
      'www/vendor/ionic/release/js/ionic.bundle.js',
      'www/vendor/angular-animate/angular-animate.js',
      'www/vendor/angular-sanitize/angular-sanitize.js',
      'www/vendor/angular-ui-router/release/angular-ui-router.js',
      'www/vendor/ionic/release/js/ionic.js',
      'www/vendor/ionic/release/js/ionic-angular.js',
      'www/vendor/ngCordova/dist/ng-cordova.js',
      'www/vendor/angular-local-storage/dist/angular-local-storage.js',
      'www/vendor/ngCordova/dist/ng-cordova-mocks.js',
      'www/vendor/underscore/underscore.js',
      'www/vendor/angular-json-api-client/dist/angular-json-api-client.js',
      'www/vendor/ionic-filter-bar/dist/ionic.filter.bar.js',
      'www/vendor/ng-cordova-oauth/dist/ng-cordova-oauth.js',
      'www/lib/facebookConnectPlugin.js',
      'www/lib/checklist-model.js',

      // Test dependency
      'www/vendor/angular-mocks/angular-mocks.js',

      // Givdo
      // -----

      // givdo module
      'www/js/givdo.module.js',

      // core
      'www/js/core/core.module.js',
      'www/js/core/*.js',

      // api
      'www/js/api/*.js',

      // auth
      'www/js/auth/*.js',

      // welcome
      'www/js/welcome/welcome.module.js',
      'www/js/welcome/*.js',

      // notifications
      'www/js/notifications/notifications.module.js',
      'www/js/notifications/*.js',

      // friends
      'www/js/friends/friends.module.js',
      'www/js/friends/*.js',

      // activities
      'www/js/activities/activities.module.js',
      'www/js/activities/*.js',

      'www/js/givdo.notifications.js',
      'www/js/givdo.util.js',
      'www/js/givdo.api.js',
      'www/js/givdo.facebook.js',
      'www/js/givdo.auth.js',
      'www/js/givdo.ui.js',
      'www/js/givdo.user.js',
      'www/js/givdo.quiz.js',
      'www/js/givdo.js',

      'specs/spec-helper.js',
      'specs/unit/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
      'yes'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['story'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
