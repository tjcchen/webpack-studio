import promise from './promise.js';
import { common } from '../../common';
import './index.css';
import '../../common/global.less';

promise.then((msg) => {
  console.log('This is in the then ' + msg);
}).catch((msg) => {
  console.log('This is in the catch ' + msg);
});

// Search.js message to html page
document.write('<div>search.js: Webpack Search Page Content</div>');

console.log(common());  // To test splitChunksPlugin to extract common module