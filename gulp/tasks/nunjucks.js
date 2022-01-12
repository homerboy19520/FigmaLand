var gulp = require("gulp");
var util = require("gulp-util");
var nunjucksRender = require("gulp-nunjucks-render");
var plumber = require("gulp-plumber");
var gulpif = require("gulp-if");
var changed = require("gulp-changed");
var prettify = require("gulp-prettify");
var data = require("gulp-data");
var path = require("path");
var fs = require("fs");
var removeEmptyLines = require("gulp-remove-empty-lines");
var strip = require("gulp-strip-comments");
var version = require("gulp-version-number");
var rename = require("gulp-rename");
const fileinclude = require("gulp-file-include");

const dirTree = require("directory-tree");

var config = require("../config");
var versionConfig = {
  value: "%MDS%",
  replaces: ["#{VERSION_REPlACE}#", [/#{VERSION_REPlACE}#/g, "%TS%"]],
  append: {
    key: "_v",
    cover: 0,
    to: [
      "css",
      ["image", "%TS%"],
      {
        type: "js",
        attr: ["src", "custom-src"],
        key: "_v",
        value: "%DATE%",
        cover: 1
      }
    ]
  },
  output: {
    file: "version.json"
  }
};

function objComponents() {
  const obj = {};
  const files = [config.src.components, config.src.pages];

  files.forEach(function(file) {
    dirTree(
      file,
      {
        extensions: /\.html$/
      },
      (item, path, stats) => {
        var name = item.name,
          path = item.path;

        name = name.replace(".html", "");
        obj[name] = path;
      }
    );
  });

  return obj;
}
function objElements() {
  const obj = {};
  const files = [config.src.elements];

  files.forEach(function(file) {
    dirTree(
      file,
      {
        extensions: /\.html$/
      },
      (item, path, stats) => {
        var name = item.name,
          path = item.path;

        name = name.replace(".html", "");
        obj[name] = path;
      }
    );
  });

  return obj;
}

function objPages() {
  const obj = {};
  const files = [config.src.pages];

  files.forEach(function(file) {
    dirTree(
      file,
      {
        extensions: /\.html$/,
        exclude: [/components/, /_/]
      },
      (item, path, stats) => {
        var name = item.name,
          path = item.path;

        name = name.replace(".html", "");
        obj[name] = {
          name: name,
          path: path,
          link: item.name
        };
      }
    );
  });

  return obj;
}

function renderHtml(onlyChanged) {
  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  });

  return gulp
    .src([
      config.src.pages + "/*/*.html",
      config.src.pages + "/*/templates/*.html"
    ])
    .pipe(
      plumber({
        errorHandler: config.errorHandler
      })
    )
    .pipe(gulpif(onlyChanged, changed(config.dest.html)))
    .pipe(
      data(function(file) {
        return objComponents();
      })
    )
    .pipe(
      data(function(file) {
        return { els: objElements() };
      })
    )
    .pipe(
      nunjucksRender({
        PRODUCTION: config.production,
        path: './'
      })
    )
    .pipe(
      prettify({
        indent_size: 2,
        wrap_attributes: "auto",
        preserve_newlines: false,
        end_with_newline: true
      })
    )
    .pipe(
      removeEmptyLines({
        removeComments: true
      })
    )
    .pipe(version(versionConfig))
    .pipe(
      rename({
        dirname: ""
      })
    )
    .pipe(gulp.dest(config.dest.html));
}

gulp.task("nunjucks:ajax", function() {
  return gulp
    .src([config.src.root + "/ajax/**.html"])
    .pipe(
      data(function(file) {
        return objComponents();
      })
    )
    .pipe(
      nunjucksRender({
        PRODUCTION: config.production,
        path: [config.src.root]
      })
    )
    .pipe(
      prettify({
        indent_size: 2,
        wrap_attributes: "auto",
        preserve_newlines: false,
        end_with_newline: true
      })
    )
    .pipe(
      removeEmptyLines({
        removeComments: true
      })
    )
    .pipe(version(versionConfig))
    .pipe(gulp.dest(config.dest.html + "/ajax"));
});

gulp.task("nunjucks:index", function() {
  return gulp
    .src([config.src.html + "/index.html"])
    .pipe(
      data(function(file) {
        return {
          pages: objPages(),
          project: {
            name: JSON.parse(fs.readFileSync("./package.json")).name
          }
        };
      })
    )
    .pipe(nunjucksRender())
    .pipe(gulp.dest(config.dest.html));
});

gulp.task("nunjucks", function() {
  return renderHtml();
});

gulp.task("nunjucks:changed", function() {
  return renderHtml(true);
});

gulp.task("nunjucks:watch", function() {
  gulp.watch([config.src.components + "/**/*.html"], ["nunjucks"]);

  gulp.watch([config.src.elements + "/**/*.html"], ["nunjucks"]);

  gulp.watch([config.src.pages + "/**/*.html"], ["nunjucks", "nunjucks:index"]);

  gulp.watch([config.src.root + "/ajax/**"], ["nunjucks:ajax"]);

  gulp.watch([config.src.html + "/**/*.html"], ["nunjucks:changed"]);

  gulp.watch([config.src.html + "/index.html"], ["nunjucks:index"]);
});
