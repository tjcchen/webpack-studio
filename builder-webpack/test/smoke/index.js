const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');

// Change root folder to 'test/smoke/template' with process.chdir()
process.chdir(path.join(__dirname, 'template'));

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod');

  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.err(err);
      process.exit(2);
    }

    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }));
  });
});
