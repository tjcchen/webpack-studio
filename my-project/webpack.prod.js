"use strict";

const path                        = require('path');
const glob                        = require('glob');
const webpack                     = require('webpack');
const MiniCssExtractPlugin        = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin     = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin           = require('html-webpack-plugin');
const { CleanWebpackPlugin }      = require('clean-webpack-plugin');
const HTMLInlineCssWebpackPlugin  = require('html-inline-css-webpack-plugin').default;
const HtmlWebpackExternalsPlugin  = require('html-webpack-externals-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SpeedMeasureWebpackPlugin   = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin }    = require('webpack-bundle-analyzer');
const TerserPlugin                = require('terser-webpack-plugin');
const HtmlWebpackTagsPlugin       = require('html-webpack-tags-plugin');
const HardSourceWebpackPlugin     = require('hard-source-webpack-plugin');
const PurgeCSSPlugin              = require('purgecss-webpack-plugin');

// Define PATHS.src for PurgeCSSPlugin, this path refers to 'src' directory
const PATHS = {
  src: path.join(__dirname, 'src')
};

// Instantiate SpeedMeasureWebpackPlugin
// usage: smp.wrap({ plugins: [] })
const smp = new SpeedMeasureWebpackPlugin();

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
      chunks: ['commons','vendors', pageName],                       // entry name chunks
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
  mode: 'none',  // change mode to none to check source-map usage; production mode will enable tree-shaking, scope-hoisting functionalities
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'  // apply [chunkhash] to JS files
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'), // only resolve current 'src' directory
        // exclude: 'node_modules',   // exclude 'node_modules'
        use: [
          {
            loader: 'thread-loader',  // thread-loader to build loaders in parallel
            options: {
              workers: 3
            }
          },
          'babel-loader?cacheDirectory=true', // with cache enabled
          'eslint-loader'
        ]
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
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
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
    
    // extract css from files into webpages
    // new HTMLInlineCssWebpackPlugin(),

    new FriendlyErrorsWebpackPlugin(),
    
    // webpack-bundle-analyzer will create an interactive treemap visualization of the contents of all your bundles
    // new BundleAnalyzerPlugin(),

    // load compressed resources(react|react-dom) to page
    new webpack.DllReferencePlugin({
      context: path.join(__dirname),
      manifest: require('./build/library/library.json')
    }),

    // [IMPORTANT:] put dynamically generated htmlWebpackPlugins group here
    // build html web pages along with options
    ...htmlWebpackPlugins,

    // add library.dll.js(react|react-dom) resource into webpage
    new HtmlWebpackTagsPlugin({
      tags: [{
        path: '../build/library',
        glob: 'library_*.dll.js',
        globPath: path.join(__dirname, './build/library')
      }],
      append: false
    }),

    // enable cache
    new HardSourceWebpackPlugin(),

    // purge unused css
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    }),

    // error catching mechanism
    function() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors &&
            stats.compilation.errors.length &&
            process.argv.indexOf('--watch') == -1
        ) {
          console.log('build error');
          process.exit(1); // cast error code
        }
      });
    }

    // solution1: split common react and react-dom resources with external links
    // new HtmlWebpackExternalsPlugin({
    //   externals: [  
    //     {
    //       module: 'react',
    //       entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
    //       global: 'React',  // window.React object becomes available
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
    //       global: 'ReactDOM',  // window.ReactDOM object becomes available
    //     }
    //   ]
    // })
  ],
  
  // source map relevant settings
  // devtool: 'source-map'  // Set source map with different mode, eg: eval, source-map, inline-source-map, cheap-source-map
  
  // solution2: apply split-chunks-plugin to extract common resources(react|react-dom)
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /(react|react-dom)/,  // extract react and react-dom resources to vendors.js
  //         name: 'vendors',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },

  optimization: {
    splitChunks: {
      minSize: 0,           // 'minSize = 0 byte' means splitChunsPlugin will extract all common resources
      cacheGroups: {        // cacheGroups means some minor groups
        commons: {          // common means common resources or modules
          name: 'commons',  // exporting resource name
          chunks: 'all',    // index, search, react
          minChunks: 2      // refer times: when common resource refer times >= 2, splitChunksPlugin will execute the extracting manipulation
        },

        // Extracting react and react-dom functionality is conflicted with webpack.DllReferencePlugin functionality,
        // therefore we commented it out temporarily
        // vendors: {
        //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        //   name: 'vendors',
        //   chunks: 'all',
        // }
      }
    },

    // uglify js files in parallel with terser-webpack-plugin
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true  // [deprecated]
      })
    ]
  },

  // configure how modules are resolved
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
    },
    modules: [path.resolve(__dirname, 'node_modules')], // tell webpack what directories should be searched when resolving modules
    extensions: ['.js'],
    mainFields: ['main']
  },

  stats: 'normal'      // 'errors-only', 'minimal', 'none', 'normal', 'verbose(default)'
};