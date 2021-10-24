var gulp = require('gulp');
var util = require('gulp-util');
var cache = require('gulp-cache');
var gnf = require('gulp-npm-files');

var config = require('../config.js');

gulp.task('copy:fonts', function() {
  return gulp
    .src(config.src.fonts + '/*.*')
    .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:img', function() {
  return gulp
    .src([
      config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
      config.dest.img + '/{png.}*.{png}',
      '!' + config.src.img + '/svgo/**/*.*'
    ])
    .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy:nd', function() {
  return gulp.src(gnf(), {
    base: './'
  }).pipe(gulp.dest(config.dest.root));
});

gulp.task('copy', [
  'copy:img',
  'copy:fonts',
]);
gulp.task('copy:watch', function() {
  gulp.watch(config.src.img + '/*', ['copy:img']);
  gulp.watch(config.src.fonts + '/*', ['copy:fonts']);
});
