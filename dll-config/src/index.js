"use strict";

"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

class Content extends React.Component {
  render() {
    return <div class="content">
      <p>Content Generated from React</p>
    </div>;
  }
};

ReactDOM.render(<Content />, document.getElementById('root'));