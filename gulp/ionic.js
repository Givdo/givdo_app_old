var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('ionic:emulate', $.shell.task('ionic emulate ios --livereload --consolelogs'));

gulp.task('ionic:run', $.shell.task('ionic run ios'))
