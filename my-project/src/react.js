"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
// import './footer.css';
import './footer.less';
import logo from './images/webpack.svg';

class ReactFooter extends React.Component{
  // please note the logo path will be relative path, relative to current .html file
  // url-loader can make image to base64 format, while file-loader cannot, it is the difference between them
  render() {
    return <div className="footer-text">
      <p>React Footer Content Inner</p>
      <img src={ logo } width="180px" height="120px" />
    </div>;
  }
};

ReactDOM.render(
  <ReactFooter />,
  document.getElementById('root')
);