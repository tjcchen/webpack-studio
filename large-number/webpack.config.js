'use strict';

const path         = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: {
    'large-number': './src/index.js',
    'large-number.min': './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'largeNumber',
    libraryTarget: 'umd',  // UMD - Universal Module Definition; support cjs, es6 module, amd simultaneously
    libraryExport: 'default'  // this is necessary, otherwise you need to write 'largeNumber.default' when you use
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/  // minimize *.min.js file only
      })
    ]
  }
};