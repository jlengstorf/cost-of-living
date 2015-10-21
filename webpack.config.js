var webpack = require('webpack');

/*
 * --------
 *  CONFIG
 * --------
 */

var BUILD_ENV = process.env.BUILD_ENV || 'development';

var deployConfig;

try {
  deployConfig = require('./deploy.config.js')[BUILD_ENV] || {};
} catch (e) {
  console.log('WARNING: No deploy.config.js found.');
  deployConfig = {};
}

//replaces require('config') in application js files with the
//contents of source/config/<env>.js as defined by `clientConfig`
//key in the deployConfig file
var clientConfig = deployConfig.clientConfig || 'development';
var replaceConfig = new webpack.NormalModuleReplacementPlugin(
    /^config$/,
    __dirname + '/source/config/' + clientConfig + '.js'
);

var publicPath = '/dist/';

/*
 * ---------
 *  PostCSS
 * ---------
 */

var PostCssImport = require('postcss-import')({ glob: true });
var PostCssMixins = require('postcss-mixins');
var PostCssNested = require('postcss-nested');
var PostCssSimpleExtend = require('postcss-simple-extend');
var PostCssSimpleVars = require('postcss-simple-vars');
var CssNext = require('cssnext')();
var CssNano = require('cssnano')();


/*
 * -------
 *  SETUP
 * -------
 */

module.exports = {
  debug: deployConfig.debug,
  devtool: deployConfig.debug ? 'eval' : undefined,

  entry: {
    bundle: './source/init.js'
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    publicPath: publicPath
  },

  module: {
    exprContextRecursive: false,
    exprContextCritical: false,

    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css!postcss-loader' },
    ]
  },

  postcss: function () {
    return [
      PostCssImport,
      PostCssMixins,
      PostCssNested,
      PostCssSimpleExtend,
      PostCssSimpleVars,
      CssNext,
      CssNano
    ];
  },

  plugins: [
    replaceConfig
  ]
};
