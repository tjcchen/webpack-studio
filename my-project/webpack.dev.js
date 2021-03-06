"use strict";

const path                        = require('path');
const webpack                     = require('webpack');
const { CleanWebpackPlugin }      = require('clean-webpack-plugin');
const HtmlWebpackPlugin           = require('html-webpack-plugin');
const MiniCssExtractPlugin        = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin     = require('optimize-css-assets-webpack-plugin');
const HTMLInlineCssWebpackPlugin  = require('html-inline-css-webpack-plugin').default;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// Single entry point file
// module.exports = {
//   mode: 'production',
//   entry: './src/index/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js'
//   }
// };

// Multiple output files
module.exports = {
  mode: 'development',       // production, development, none
  watch: true,               // default value is false
  watchOptions: {            // watchOptions takes effect only when watch is true
    ignored: /node_modules/, // watch ignored files or folders, regular expression is supported
    aggregateTimeout: 300,   // cache wait time
    poll: 1000               // polling to check file changes
  },
  entry: {
    index: './src/index/index.js',
    search: './src/search/index.js',
    react: './src/react/index.js'
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
          MiniCssExtractPlugin.loader,
          'css-loader'     // the rule is to load the loaders from right to left, namely css-loader first, then style-loader
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',  // the sequence of loaders array matters
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
              limit: 10240 // 10240 bit = 10k
            }
          }
        ]
      },
      {  // font resources can be downloaded from https://fonts.google.com/
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader' // npm i file-loader -D
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),  // WDS needs to work together with HotModuleReplacementPlugin to take effect
    new MiniCssExtractPlugin(),
    new OptimizeCSSAssetsPlugin({              // css compressor
      assetNameRegExp: /.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
    // html compressor - index.html
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index/index.html'),  // entry point file
      filename: 'index.html',  // output file
      chunks: ['index'],       // entry name chunks
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
    // html compressor - search.html
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/search/index.html'),  // entry point file
      filename: 'search.html',  // output file
      chunks: ['search'],       // entry name chunks
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
    // html compressor - react.html
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/react/index.html'),  // entry point file
      filename: 'react.html',  // output file
      chunks: ['react'],       // entry name chunks
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
    new CleanWebpackPlugin(),                  // clear /dist folder before bundling
    new HTMLInlineCssWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  devServer: {             // npm i webpack-dev-server -D
    contentBase: './dist', // serving directory
    hot: true,             // open live reloading option
    stats: 'errors-only'
  },
  // devtool: 'cheap-source-map'
};

