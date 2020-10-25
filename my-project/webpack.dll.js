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
    filename: '[name].dll.js',  // todo: check contenthash problem
    path: path.resolve(__dirname, './build/library'),
    library: '[name]' // [name] placeholder refers to entry name - 'library'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]', // todo: check hash problem
      path: path.resolve(__dirname, './build/library/[name].json'),
    })
  ]
};
