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
    entry: {
      main: './src/main.js',
      vendor: './src/vendor.js',
      polyfills: './src/polyfills.js'
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
    },
    resolve: {
      root: path.join(__dirname, 'src')
    },
    module: {
      preLoaders: [],
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        }, {
          test: /\.css$/,
          // loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
          loader: 'raw!css?sourceMap!postcss'
        }, {
          test: /\.scss$/,
          // loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
          loader: 'raw!postcss!sass'
          // loader: 'raw!postcss!sass?includePaths[]='+path.resolve(__dirname, './node_modules/compass-mixins/lib')
        }, {
          test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
          loader: 'file'
        }, {
          test: /\.html$/,
          loader: 'raw'
        }
      ]
    },
    
    postcss: [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ],
    
    plugins: [
      
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
      
      new webpack.NoErrorsPlugin(),
      
      new webpack.optimize.DedupePlugin(),
      
      // new webpack.optimize.UglifyJsPlugin(),
      
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }]),
      
      new BowerWebpackPlugin({
        excludes: /.*\.less/
      }),
      
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        // angular: 'angular'
      }),
      
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