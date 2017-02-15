var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var settings = gulp.givdoSettings;
var build = settings.build;
var paths = settings.paths;
var errorHandler = gulp.errorHandler;


var _inject = function(src, tag) {
  return $.inject(src, {
    starttag: '<!-- inject:' + tag + ':{{ext}} -->',
    addRootSlash: false
  });
}

gulp.task('inject-app', function() {
  var streamOptions = { cwd: paths.build };
  var stylesheetsStream = gulp.src('css/*.css', streamOptions);

  return gulp
    .src(paths.indexFile)
    .pipe(wiredep({ ignorePath: 'bower_components' }))
    .pipe(_inject(stylesheetsStream, 'app'))
    .pipe(gulp.dest(paths.build))
    .on('error', errorHandler);
});

gulp.task('noop', function() {});

gulp.task('inject', function(done) {
  runSequence(
    'vendor',
    'browserify',
    'inject-app',
    done
  );
});
