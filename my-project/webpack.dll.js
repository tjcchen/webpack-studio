const path    = require('path');
const webpack = require('webpack');

module.exports = {
  context: process.cwd(), // process.cwd() method returns the current working directory of the Node.js process
  entry: {
    library: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.resolve(__dirname, './build/library'),
    filename: '[name]_[chunkhash:8].dll.js',
    library: '[name]' // [name] placeholder refers to window global name 'library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, './build/library/[name].json'),
      name: '[name]'
    })
  ]
};
