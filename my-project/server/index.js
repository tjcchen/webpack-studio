// window hack
if (typeof window === 'undefined') {
  global.window = {};
}

const fs = require('fs'); // file reader
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/react-server');
const template = fs.readFileSync(path.join(__dirname, '../dist/react.html'), 'utf-8'); // convert buffer to utf-8

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
  return template.replace('<!--HTML_PLACEHOLDER-->', str);
};

server(process.env.PORT || 3000);