const gulp = require("gulp");
const zip = require("gulp-zip");

gulp.task("zip", function(cb) {
  return gulp
    .src("build/**/*")
    .pipe(zip("_build.zip"))
    .pipe(gulp.dest("build"));
});
