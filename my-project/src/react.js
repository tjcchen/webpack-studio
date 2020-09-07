"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
// import './footer.css';
import './footer.less';

class ReactFooter extends React.Component{
  render() {
    return <div class="footer-text">React Footer</div>
  }
};

ReactDOM.render(
  <ReactFooter />,
  document.getElementById('root')
);
