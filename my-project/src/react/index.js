"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

// import common module to test splitChunksPlugin
import { common } from '../../common';

// import './react.css';
import './react.less';

import logo from '../assets/images/webpack.svg';

class ReactFooter extends React.Component{
  // please note the logo path will be relative path, relative to current .html file
  // url-loader can make image to base64 format, while file-loader cannot, it is the difference between them
  render() {
    // debugger;  // To test source-map
    // a = 1;     // To test inline-source-map
    return <div className="footer-text">
      <p>React Footer Content</p>
      <img src={ logo } width="200px" height="120px" />
    </div>;
  }
};

console.log(common());  // To test splitChunksPlugin to extract common module

ReactDOM.render(
  <ReactFooter />,
  document.getElementById('root')
);