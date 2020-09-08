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
        test: /\.js$/,
        use: 'babel-loader'// utilize babel-loader in webpack
      },
      {
        test: /\.css$/,
        use: [             // npm i style-loader css-loader -D
          'style-loader',  // the sequence of loaders array matters
          'css-loader'     // the rule is to load the loaders from right to left, namely css-loader first, then style-loader
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'    // npm i less less-loader -D
        ]
      },
      // {
      //   test: /\.(jpg|gif|svg|png|jpeg)$/,
      //   use: 'file-loader' // npm i file-loader -D
      // },
      {  // url-loader can be used to load image and font resources too, it can also add base64 manipulation when resource size is small
        test: /\.(jpg|gif|svg|png|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240 // 10240bit = 10k
            }
          }
        ]
      },
      {  // font resources can be downloaded from https://fonts.google.com/
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader' // npm i file-loader -D
      }
    ]
  }
};

