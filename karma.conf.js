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
      'www/lib/ionic/js/ionic.bundle.js',
      'www/lib/jquery/dist/jquery.js',
      'www/lib/collide/collide.js',
      'www/lib/ionic-ion-tinder-cards/ionic.tdcards.js',
      'www/lib/angular-cookie/angular-cookie.js',
      'www/lib/ng-token-auth/dist/ng-token-auth.js',
      'www/lib/angular-resource/angular-resource.js',
      'www/lib/ngCordova/dist/ng-cordova.js',
      'www/lib/ngCordova/dist/ng-cordova-mocks.js',
      'www/lib/angular-local-storage/dist/angular-local-storage.js',

      // Test dependency
      'www/lib/angular-mocks/angular-mocks.js',

      // Givdo
      'www/js/givdo.api.js',
      'www/js/givdo.facebook.js',
      'www/js/givdo.auth.js',
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
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
