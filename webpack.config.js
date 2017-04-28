const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env) {
  return {
    devtool: 'eval',

    entry: {
      app: path.join(__dirname, 'app', 'app.js'),
    },

    resolve: {
      extensions: ['.js'],

      modules: [
        'node_modules',
        path.resolve(__dirname, 'app'),
        path.resolve(__dirname, 'assets/css'),
      ],

      alias: {
        config: path.join(__dirname, 'config', 'development'),
        'ionic$': 'ionic-angular/release/js/ionic.js',
        'ionic-angular$': 'ionic-angular/release/js/ionic-angular.js',
      },
    },

    output: {
      filename: `bundle.[name].'[hash]'.js`,
      path: path.resolve(__dirname, 'www'),
    },

    devServer: {
      hot: true,
      contentBase: [
        path.join(__dirname, 'www'),
        path.join(__dirname, 'assets'),
      ],
    },

    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: [
            /node_modules/,
          ],
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['es2015'],
          },
        },

        {
          test: /\.scss?$/,
          use: ExtractTextPlugin.extract({
            allChunks: true,
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

        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=fonts/[name].[ext]',
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

    stats: {
      colors: true,
      reasons: true,
      chunks: true
    },
  };
}
