var gulp = require('gulp');
var util = require('gulp-util');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var stripCssComments = require('gulp-strip-css-comments');

var postcss = require('gulp-postcss');
var csso = require('postcss-csso');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var path = require('path');

/* @dependencies */

var config = require('../config');

var processors = [
  require('postcss-prepend-imports')({
    files: [
      'src/css/helpers/vars.css',
    ]
  }),
  require('postcss-easy-import')({
    path: path.resolve('src')
  }),
  require('postcss-mixins')({
    mixinsFiles: path.resolve('src/css/helpers/mixins/')
  }),
  require('postcss-advanced-variables'),
  require('postcss-custom-media'),
  require('postcss-custom-properties'),
  require('postcss-media-minmax'),
  require('postcss-color-function'),
  require('postcss-nested-ancestors'),
  require('postcss-nesting'),
  require('postcss-nested'),
  require('postcss-custom-selectors'),
  require('postcss-atroot'),
  require('postcss-property-lookup'),
  require('postcss-extend'),
  require('postcss-selector-matches'),
  require('postcss-selector-not'),
  /* @postcss */
  mqpacker({
    sort: sortMediaQueries
  }),
  autoprefixer({
    browsers: ['last 4 versions'],
    cascade: false
  }),
  require('postcss-automath'),
];

gulp.task('postcss', function() {
  return gulp
    .src([
      config.src.postcss + '/app.css',
      config.src.postcss + '/vendors.css'
    ])
    .pipe(config.production ? sourcemaps.init() : util.noop())
    .pipe(postcss(processors))
    .pipe(stripCssComments({
      preserve: false
    }))
    .pipe(config.production ? postcss([csso({
      comments: false
    })]) : util.noop())
    /*.pipe(config.production ? sourcemaps.write('.') : util.noop())*/
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('postcss:watch', function() {
  gulp.watch([
    config.src.postcss + '/**/*.css',
    config.src.components + '/**/*.css',
    config.src.elements + '/**/*.css',
    config.src.pages + '/**/*.css'
  ], ['postcss']);
});

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
  A = a.replace(/\D/g, '');
  B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }

  return 1;
}
