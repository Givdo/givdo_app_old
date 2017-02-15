var gulp = require('gulp');
var stylish = require('jshint-stylish');
var $ = require('gulp-load-plugins')();

var build = gulp.build;
var paths = gulp.paths;
var errorHandler = gulp.errorHandler;


gulp.task('jshint', function(done) {
  return gulp
    .src(paths.javascripts)
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish))
    .on('error', errorHandler);

    done();
});
