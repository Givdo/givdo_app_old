var gulp = require('gulp');
var path = require('path');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var debowerify = require('debowerify');
var ngHtml2Js = require('browserify-ng-html2js');
var streamqueue = require('streamqueue');
var source = require('vinyl-source-stream');
var mainBowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')();

var settings = gulp.givdoSettings;
var build = settings.build;
var paths = settings.paths;
var errorHandler = gulp.errorHandler;


gulp.task('config', function() {
  var configFile = path.join(paths.config, settings.environment + '.js');

  return gulp
    .src(configFile)
    .pipe($.rename('config.js'))
    .pipe(gulp.dest(paths.config))
    .on('error', errorHandler);
});

gulp.task('images', function() {
  var destDir = path.join(paths.build, 'img');

  return gulp
    .src(paths.images)
    .pipe(gulp.dest(destDir))
    .on('error', errorHandler);
});

gulp.task('fonts', function() {
  var destDir = path.join(paths.build, 'fonts');

  return gulp
    .src('./app/bower_components/ionic/release/fonts/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest(destDir));
});

gulp.task('vendor', function() {
  var cssFilter = $.filter('**/*.css', { restore: true });

  return gulp
    .src(mainBowerFiles())
    .pipe(cssFilter)
    .pipe($.concat('vendor.css'))
    .pipe(gulp.dest(paths.build))
    .pipe(cssFilter.restore)
    .on('error', errorHandler);
});

gulp.task('browserify', ['config'], function() {
  var destDir = path.join(paths.build, 'js');

  var b = browserify({
      debug: true,
      paths: ['./config/'],
    })
    .transform(ngHtml2Js, {
      extension: 'html',
      module: 'givdo.templates',
      baseDir: './app/javascripts/',
    })
    .transform('babelify', ({
      ignore: '**/app/bower_components/angular/angular.js',
    }))
    .transform('debowerify')
    .add('./app/javascripts/givdo.module.js');

  return b
    .bundle()
    .pipe(source('givdo.bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest(destDir))
});

gulp.task('javascripts', function() {
  var dest = path.join(paths.build, 'js');

  var minifyConfig = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeComments: true
  };

  var templateStream = gulp
    .src(paths.templates)
    .pipe($.angularTemplatecache('templates.js', {
      root: 'templates/',
      module: 'givdo.templates',
      standalone: true,
      htmlmin: false,
    }));

    var javascriptStream = gulp
      .src(['templates.js', 'app.js', '**/*.js'], { cwd: 'app/javascripts' })
      .pipe($.if(!build, $.changed(dest)));

  return streamqueue({ objectMode: true }, javascriptStream, templateStream)
    .pipe($.if(build, $.concat('app.js')))
    .pipe($.if(build, $.uglify()))
    .pipe(gulp.dest(dest))
    .on('error', errorHandler);
});


gulp.task('stylesheets', function() {
  var dest = path.join(paths.build, 'css');
  var options = build ? { style: 'compressed' } : { style: 'expanded' };

  var sassStream = gulp.src('./app/stylesheets/givdo.scss')
    .pipe($.sass(options))
    .on('error', errorHandler);

  var ionicStream = gulp.src('./www/vendor/ionic/scss/ionic.scss')
    .pipe($.sass(options))
    .on('error', errorHandler);

  return streamqueue({ objectMode: true },ionicStream, sassStream)
    .pipe($.concat('main.css'))
    .pipe(gulp.dest(dest))
    .on('error', errorHandler);
});
