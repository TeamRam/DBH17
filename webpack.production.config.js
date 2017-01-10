'use strict';

var path = require('path');
var webpack = require('webpack');
var del = require('del');

class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply() {
    del.sync(this.options.files);
  }
}

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './app/index',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanPlugin({
      files: ['dist/*']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  node: {
    fs: 'empty',
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      include: path.join(__dirname, 'app'),
      query: {
        plugins: [
          ['transform-object-assign']
        ]
      }
    },
    { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' }
    ]
  }
};
