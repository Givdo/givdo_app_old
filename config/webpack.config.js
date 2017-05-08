var path = require('path');
var webpack = require('webpack');

var projectRootDir = process.env.IONIC_ROOT_DIR;
var appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR;

var env = process.env.IONIC_ENV || 'dev';
var config = require(path.join(appScriptsDir, 'config', 'webpack.config.js'));

config.resolve = config.resolve || {};
config.resolve.alias = {
  'config$': path.resolve(projectRootDir, 'src', 'config', env + '.ts'),
};

config.plugins = config.plugins || [];
config.plugins.push(
  new webpack.DefinePlugin({
    ENV: env,
  })
);

module.exports = config;
