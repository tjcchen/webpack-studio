// window hack
if (typeof window === 'undefined') {
  global.window = {};
}

// document hack
if (typeof document === 'undefined') {
  global.document = {};
  global.document.write = function() {};
}

const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server');

const server = (port) => {
  const app = express();

  // static target folder
  app.use(express.static('dist'));

  // routers
  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR));

    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log('Server is running on port: ' + port);
  });
};

server(process.env.PORT || 3000);

const renderMarkup = (str) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="root">${str}</div>
    </body>
  </html>`;
};