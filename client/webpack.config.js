'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var BowerWebpackPlugin = require('bower-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {

  /**
   * Config
   * 
   * Main configuration object.
   * See: http://webpack.config.io/docs/configuration.html
   */
  var config = {

    /**
     * Entry
     * 
     * The main entry file
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {
      app: './src/app/app.js',
      vendors: './src/vendors.js'
    },

    /**
     * Output
     * 
     * Settings for WebPack's output
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].[hash].bundle.js'
    },
    
    /**
     * Resolve
     * 
     * Options affecting the resolution of modules
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      root: path.join(__dirname, 'src')
    },

    /**
     * Module
     * 
     * Produces settings for how WebPack should handle files
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    module: {
      preLoaders: [],
      loaders: [
        {
          /**
           * JavaScript Loader
           * 
           * Transpiles ES6 JavaScript to ES5
           * See: https://github.com/babel/babel-loader
           */
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        }, {
          /**
           * CSS Loader
           * 
           * Allows the loading of CSS files from within JavaScript
           * See: https://github.com/webpack/css-loader
           */
          test: /\.css$/,

          /**
           * ExtractTextPlugin
           * 
           * Extracts files into a separate bundle file
           * See: https://github.com/webpack/extract-text-webpack-plugin
           */
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
          // loader: 'style!css?sourceMap!postcss'
          // loader: 'style!css?sourceMap'
        }, {
          
          /**
           * SASS Loader
           * 
           * Allows the loading of SASS files from within JavaScript
           */
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
          // loader: 'style!css?sourceMap!postcss!sass'
          // loader: 'style!css?sourceMap!sass'
        }, {
          /**
           * Asset Loader
           * 
           * Copies files and exposes new names in code
           * See: https://github.com/webpack/file-loader
           */
          test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
          loader: 'file'
        }, {
          /**
           * HTML Loader
           * 
           * Allows the loading of HTML files from within JavaScript
           * See: https://github.com/webpack/raw-loader
           */
          test: /\.html$/,
          loader: 'raw'
        }
      ]
    },

    /**
     * PostCSS
     * 
     * Adds vendor prefixes to CSS
     * See: https://github.com/postcss/autoprefixer-core
     */
    postcss: [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ],

    /**
     * Plugins
     * 
     * Plugins to modify the output of the bundles.
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

      /**
       * HtmlWebpackPlugin
       * 
       * Allows for WebPack configuration to be reflected in index.html
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        inject: 'body',
        baseUrl: '/',
        title: 'ToDoList for the Red Bees',
        bower_deps: {
          bootstrap: '/'
        }
      }),

      new ExtractTextPlugin('styles.css'),

      /**
       * NoErrorsPlugin
       * 
       * Emits files only when built without errors
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new webpack.NoErrorsPlugin(),

      /**
       * DedupePlugin
       * 
       * Dedupes modules in output
       * See: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
       */
      new webpack.optimize.DedupePlugin(),

      /**
       * UglifyJsPlugin
       * 
       * Minifies all JavaScript
       * See: http://webpack.github.io/docs/list-of-plugins.html#ugilfyjsplugin
       */
      new webpack.optimize.UglifyJsPlugin(),

      /**
       * CopyWebpackPlugin
       * 
       * Copies assets from the assets folder
       * See: https://github.com/kevlened/copy-webpack-plugin
       */
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }]),
      
      /**
       * BowerWebpackPlugin
       * 
       * Includes Bower dependencies
       * See: https://github.com/lpiepiora/bower-webpack-plugin
       */
      new BowerWebpackPlugin({
        excludes: /.*\.less/
      }),
      
      /**
       * ProvidePlugin
       * 
       * Automatically provides modules
       * See: https://webpack.github.io/docs/list-of-plugins.html#provideplugin
       */
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        // angular: 'angular'
      }),
      
      /**
       * CleanWebpackPlugin
       * 
       * Cleans the dist folder
       * See: https://github.com/johnagan/clean-webpack-plugin
       */
      new CleanWebpackPlugin(['dist']),
    ]
  };

  if (isTest) {
    config.devtool = 'inline-source-map';
  } else if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }
  
  return config;
}();