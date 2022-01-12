var gulp = require('gulp');
var path = require('path');
var util = require('gulp-util');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglifyJs = require('gulp-uglify');
var config = require('../config');
var include = require("gulp-include");
var removeEmptyLines = require('gulp-remove-empty-lines');
var strip = require('gulp-strip-comments');

gulp.task('js', function() {
  return gulp.src(config.src.js + '/*.js')
    .pipe(include({
      hardFail: true,
      includePaths: [
        path.resolve('node_modules'),
        path.resolve('src')
      ]
    }))
    .pipe(removeEmptyLines({
      removeComments: true
    }))
    .pipe(strip())
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(config.production ? uglifyJs() : util.noop())
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('js:watch', function() {
  gulp.watch([
    config.src.js + '/**/**',
    config.src.components + '/**/*.js'
  ], ['js']);
});
