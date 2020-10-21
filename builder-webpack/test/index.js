const path = require('path');

// Change dir path to smoke/template
process.chdir(path.join(__dirname, 'smoke/template'));

describe('builder-webpack test case', () => {
  // ADD TEST CASES
  require('./unit/webpack-base-test');
});