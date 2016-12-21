var gulp = require('gulp');
var path = require('path');
var KarmaServer = require('karma').Server;
var $ = require('gulp-load-plugins')();

var paths = gulp.paths;


gulp.task('specs', function(done) {
  new KarmaServer({
    singleRun: true,
    configFile: path.join(paths.root, 'karma.conf.js'),
  }, done).start();
});
