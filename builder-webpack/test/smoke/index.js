const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: '10000ms'  // test timeout 10s
});

// Change root folder to 'test/smoke/template' with process.chdir()
process.chdir(path.join(__dirname, 'template'));

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod');

  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.err(err);
      process.exit(2);
    }

    console.log(stats.toString({ colors: true, modules: false, children: false }));
  
    console.log('Webpack build succeed, begin to run test.');

    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'css-js-test.js'));

    mocha.run();
  });
});
