// window hack
if (typeof window === 'undefined') {
  global.window = {};
}

const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/react-server');

const server = (port) => {
  const app = express();

  // static target folder
  app.use(express.static('dist'));

  // routers
  app.get('/react', (req, res) => {
    const html = renderMarkup(renderToString(SSR));

    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log('Server is running on port: ' + port);
  });
};

const renderMarkup = (str) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title>React Html Page</title>
    </head>
    <body>
      <div id="root">1111${str}22222</div>
      <script src="vendors-server.js"></script>
      <script src="react-server.js"></script>
    </body>
  </html>`;
};

server(process.env.PORT || 3000);