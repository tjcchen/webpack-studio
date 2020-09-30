module.exports = {
  mode: 'none',
  entry: {
    'large-number': './src/index.js',
    'large-number.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'largeNumber',
    libraryTarget: 'umd',
    libraryExport: 'default'  // this is necessary, otherwise when you use, you need to write largeNumber.default
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