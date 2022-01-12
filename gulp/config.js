var util = require('gulp-util');

var production = util.env.production || util.env.prod || false;
var destPath = 'build';

var config = {
  env: 'development',
  production: production,

  src: {
    main: '/',
    root: 'src',
    html: 'src/html',
    pages: 'src/pages',
    postcss: 'src/css',
    components: 'src/components',
    elements: 'src/elements',
    postcssGen: 'src/css/generated',
    js: 'src/js',
    img: 'src/images',
    icons: 'src/icons',
    fonts: 'src/fonts'
  },
  dest: {
    root: destPath,
    html: destPath,
    css: destPath + '/css',
    js: destPath + '/js',
    img: destPath + '/images',
    fonts: destPath + '/fonts'
  },

  setEnv: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  logEnv: function() {
    util.log(
      'Environment:',
      util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
    );
  },

  errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
