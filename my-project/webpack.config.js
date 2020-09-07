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
    search: './src/search.js',
    react: './src/react.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'  // a name placeholder is needed when output multiple files
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader'  // Utilize babel loader in webpack
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',  // the sequence of loaders array is important
          'css-loader'
        ]
      }
    ]
  }
};

