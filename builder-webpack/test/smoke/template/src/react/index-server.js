"use strict";

// SSR requires CommonJS import
const React = require('react');
const logo  = require('../assets/images/webpack.svg');
require('./react.less');

class ReactFooter extends React.Component{
  constructor() {
    super(...arguments);

    this.state = {
      Text: null
    };
  }

  // Dynamically import Js resource
  loadComponent() {
    console.log('todo: fix this place');
    
    require('./text.js').then((Text) => {  // import func return a promise object
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
    const { Text } = this.state;

    return <div className="footer-text">
      {
        Text ? <Text /> : null
      }
      <p>React Footer Content</p>
      <img src={ logo.default } width="200px" height="120px" onClick={ this.loadComponent.bind(this) } />
    </div>;
  }
};

// SSR utilizes CommonJS exports
module.exports = <ReactFooter />;