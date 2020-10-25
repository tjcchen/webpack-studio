const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    library: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name].dll.js',  // todo: check contenthash problem
    path: path.resolve(__dirname, './build/library'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]', // todo: check hash problem
      path: path.resolve(__dirname, './build/library/[name].json'),
    })
  ]
};
