import _ from 'lodash';
import { print } from './print';
import { common } from '../../common';
import { a, b } from './tree-shaking';
import './index.css';
import '../../common/global.less';

function component() {
  const element = document.createElement('div');

  // Utilizes lodash convenience method 'join'
  element.innerHTML = _.join(['index.js', ':', 'hello', 'webpack', 2020, 'fall'], ' ');

  return element;
}

document.body.appendChild(component());

document.write(print());  // message from print.js

console.log(common());    // To test splitChunksPlugin to extract common module

console.log(a());         // To test tree-shaking functionality

// Dead code, webpack will not bundle it
if (false) {
  console.log(b());
}