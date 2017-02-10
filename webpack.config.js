'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: '#source-map',
  entry: {
    app: ['webpack-hot-middleware/client', './app/index.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  node: {
    fs: 'empty',
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'app'),
      query: {
        plugins: [
          ['react-transform', {
            'transforms': [{
              transform: 'react-transform-hmr',
              // If you use React Native, pass 'react-native' instead:
              imports: ['react'],
              // This is important for Webpack HMR:
              locals: ['module']
            }]
          }],
          ['transform-object-assign']
        ]
      }
    },
    { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' },
    ]
  }
};
