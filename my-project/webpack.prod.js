"use strict";

const path                       = require('path');
const glob                       = require('glob');
const MiniCssExtractPlugin       = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin    = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin          = require('html-webpack-plugin');
const { CleanWebpackPlugin }     = require('clean-webpack-plugin');
const HTMLInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default;

// Set js and html entry files of multiple-pages application
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  // Retrieve index.js local path
  // eg: ['/Users/chen/webpack-studio/my-project/src/index/index.js', '/Users/chen/webpack-studio/my-project/src/react/index.js']
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

  // Retrieve entry names
  Object.keys(entryFiles).map((index) => {
    const entryFile             = entryFiles[index];
    const match                 = entryFile.match(/src\/(.*)\/index\.js/);  // eg: index, react
    const pageName              = match && match[1];
    let htmlWebpackPluginOption = {};

    entry[pageName] = entryFile;

    htmlWebpackPluginOption = {
      template: path.join(__dirname, `src/${pageName}/index.html`),  // entry point file
      filename: `${pageName}.html`,                                  // output file
      chunks: [pageName],                                            // entry name chunks
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    };

    htmlWebpackPlugins.push(new HtmlWebpackPlugin(htmlWebpackPluginOption));
  });

  return {
    entry,
    htmlWebpackPlugins
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  mode: 'production',  // change mode to none to check source map usage
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'  // apply [chunkhash] to JS files
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [            
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // https://blog.jakoblind.no/postcss-webpack/
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'less-loader',
          // apply autoprefixer to auto adding modern browers' CSS3 prefix in postcss.config.js
          'postcss-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,  // 1rem = 75px
              remPrecision: 8  // decimal point precision
            }
          }
        ]
      },
      {  // images and fonts can use the same file-loader [hash] configuration since they are both file resources
        test: /\.(jpg|gif|svg|png|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // css resources need to use MiniCssExtractPlugin and [contenthash] while removing style-loader
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    // css compressor
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin(),
    new HTMLInlineCssWebpackPlugin()
  ].concat(htmlWebpackPlugins),  // Dynamically append htmlWebpackPlugins
  // source map relevant settings
  devtool: 'source-map'  // Set source map with different mode, eg: eval, source-map, inline-source-map, cheap-source-map
};

