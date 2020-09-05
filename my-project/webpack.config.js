"use strict";

const path = require('path');

// Single entry point file
// module.exports = {
//   mode: 'production',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js'
//   }
// };

// Multiple output files
module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'  // a name placeholder is needed when output multiple files
  }
};

