"use strict";

const path    = require('path');
const webpack = require('webpack');

module.exports = {
  context: process.cwd(),
  entry: {
    library: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'build', '[name]-manifest.json'),
      name: '[name]'
    })
  ]
};