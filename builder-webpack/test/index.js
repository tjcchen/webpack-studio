// 'npm run test' command will find /test/index.js entry point file automatically
const path = require('path');

// Change dir path to smoke/template
process.chdir(path.join(__dirname, 'smoke/template'));

describe('builder-webpack test case', () => {
  // ADD TEST CASES, YOU CAN PUT MORE ANY OTHER CASES HERE
  require('./unit/webpack-base.test');
});