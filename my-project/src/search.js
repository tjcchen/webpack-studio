import promise from './promise.js';

promise.then((msg) => {
  console.log('This is in the then ' + msg);
}).catch((msg) => {
  console.log('This is in the catch ' + msg);
});

// Search.js message to html page
document.write('<p>search.js: Webpack Search Page</p>');