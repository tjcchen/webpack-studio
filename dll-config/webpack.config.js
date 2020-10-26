"use strict";

const path                        = require('path');
const webpack                     = require('webpack');
const HtmlWebpackPlugin           = require('html-webpack-plugin');
const { CleanWebpackPlugin }      = require('clean-webpack-plugin');
const MiniCssExtractPlugin        = require('mini-css-extract-plugin');
const CssMinimizerPlugin          = require('css-minimizer-webpack-plugin');
const HTMLInlineCssWebpackPlugin  = require('html-inline-css-webpack-plugin').default;
const AddAssetHtmlPlugin          = require('add-asset-html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, './src/index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname),
      manifest: require('./build/library-manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      }
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './build/library.dll.js')
    }),
    new HTMLInlineCssWebpackPlugin(),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
};