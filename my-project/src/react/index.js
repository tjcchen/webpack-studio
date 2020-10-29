"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { common } from '../../common'; // import common module to test splitChunksPlugin
import './react.less'; // import './react.css';
import 'babel-polyfill'; // add to test webpack-bundle-analyzer plugin
import logo from '../assets/images/webpack.svg';
import neuImage from '../assets/images/NEU.jpg'; // import a large image

class ReactFooter extends React.Component{
  constructor() {
    super(...arguments);

    this.state = {
      Text: null
    };
  }

  // Dynamically import Js resource
  loadComponent() {
    import('./text.js').then((Text) => {  // import func return a promise object
      this.setState({
        Text: Text.default
      });

      console.log('Text: ', Text);  // Text is a module
      console.log('Text default: ', Text.default);  // Text.default is html tag response
    });
  }

  // please note the logo path will be a relative path, relative to current .html file
  // url-loader can make image to base64 format, while file-loader cannot. It is the difference between them
  render() {
    // debugger;  // To test source-map
    // a = 1;     // To test inline-source-map

    const { Text } = this.state;

    return <div className="footer-text">
      {
        Text ? <Text /> : null
      }
      <p>React Footer Content</p>
      <img src={ logo } width="200px" height="120px" onClick={ this.loadComponent.bind(this) } />
      <br/>
      <img src={ neuImage } width="300px" height="210px" />
    </div>;
  }
};

console.log(common());  // To test splitChunksPlugin to extract common module

ReactDOM.render(<ReactFooter />, document.getElementById('root'));