const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Retrieve appropriate root folder,
// process.cwd() will return the folder path of current node's index.js
// eg: /Users/xxx/webpack-studio/builder-webpack/test/smoke/template
const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    let htmlWebpackPluginOption = {};

    entry[pageName] = entryFile;

    htmlWebpackPluginOption = {
      template: path.join(projectRoot, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: ['commons', 'vendors', pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWithspace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    };

    return htmlWebpackPlugins.push(new HtmlWebpackPlugin(htmlWebpackPluginOption));
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'less-loader',
          'postcss-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /\.(jpg|gif|svg|png|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function webpackErrorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors
            && stats.compilation.errors.length
            && process.argv.indexOf('--watch') === -1
        ) {
          console.log('build error'); // eslint-disable-line
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),

  stats: 'errors-only',
};
