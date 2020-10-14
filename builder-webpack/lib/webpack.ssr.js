"use strict";

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const prodConfig = {
  mode: 'production',
  modules: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader'
      },
      {
        test: /\.css$/,
        use: 'ignore-loader'
      }
    ]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [  
        {
          module: 'react',
          entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
};

module.exports = merge(baseConfig, prodConfig);