const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let ENV = process.env.ENV || 'dev';

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/app.js'),
  },

  devtool: 'source-map',

  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'www'),
    chunkFilename: 'js/[chunkhash].js'
  },

  devServer: {
    compress: true,
    contentBase: [
      path.join(__dirname, 'www'),
      path.join(__dirname, 'assets')
    ],
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'assets'),
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2017'],
        },
      },

      {
        test: /\.scss?$/,
        use: ExtractTextPlugin.extract({
          allChunks: true,
          filename: 'css?sourceMap!sass?sourceMap',
          use: ['css-loader', 'sass-loader'],
        }),
      },

      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?context=public&limit=10000&name=[name].[ext]',
        include: path.resolve(__dirname, 'assets/img'),
      },

      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true,
    }),

    new HtmlWebpackPlugin({
      title: 'Givdo (beta)',
      filename: 'index.html',
      template: path.join(__dirname, 'app', 'index.html.ejs'),
      securityPolicy: "default-src gap://ready file://* *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *",
    })
  ],

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app'),
      path.resolve(__dirname, 'assets/css'),
    ],

    extensions: ['.js'],

    alias: {
      config: path.join(__dirname, 'config', 'development.js'),
      'ionic$': 'ionic-angular/release/js/ionic.js',
      'ionic-angular$': 'ionic-angular/release/js/ionic-angular.js',
    },
  },
};
