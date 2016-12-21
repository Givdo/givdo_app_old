var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();

var express = require('express');
var runSequence = require('run-sequence');
var connectLivereload = require('connect-livereload');

var build = gulp.build = false;

var settings = gulp.givdoSettings = {
  build: false,

  environment: process.env.NODE_ENV || 'development',

  // Folders and paths
  paths: {
    root: path.resolve(),
    src: path.resolve('app'),
    build: path.resolve('www'),
    config: path.resolve('config'),

    indexFile: path.resolve('app', 'index.html'),
    images: path.resolve('app', 'images', '**/*'),
    templates: path.resolve('app', 'templates', '**/*.html'),
    stylesheets: path.resolve('app', 'stylesheets', '**/*.scss'),
    javascripts: path.resolve('app', 'javascripts', '**/*.js'),
  },

};

var errorHandler = gulp.errorHandler = function(error) {
  if (build) {
    throw error;
  } else {
    $.util.log(error);
  }
};


require('./gulp/building.js');
require('./gulp/ionic.js');
require('./gulp/injecting.js');
require('./gulp/linting.js');
require('./gulp/testing.js');


gulp.task('default', function(done) {
  runSequence(
    'clean',
    [
      'fonts',
      'stylesheets',
      'images',
      'vendor',
    ],
    'inject',
    build ? 'noop' : 'serve',
    build ? 'noop' : 'watchers',
    done);
});

gulp.task('noop', function() {});

gulp.task('test', function() {
  console.log('images: ' + settings.paths.images);
  console.log('styles: ' + settings.paths.stylesheets);
  console.log('scripts: ' + settings.paths.javascripts);
});

gulp.task('clean', function() {
  return gulp
    .src(settings.paths.build, { read: false })
    .pipe($.clean());
});


gulp.task('watchers', function() {
  $.livereload.listen();

  gulp.watch(settings.paths.stylesheets, ['stylesheets']);
  gulp.watch(settings.paths.javascripts, ['inject']);
  gulp.watch(settings.paths.images, ['images']);
  gulp.watch(settings.paths.templates, ['templates']);
  gulp.watch(settings.paths.indexFile, ['inject']);

  gulp
    .watch(settings.paths.build + '/**/*')
    .on('change', $.livereload.changed)
    .on('error', errorHandler);
});

gulp.task('serve', function() {
  var server = express()
    .use(connectLivereload())
    .use(express.static(settings.paths.build))
    .use(express.static(path.join(settings.paths.src, 'bower_components')))
    .listen(8000);
});
