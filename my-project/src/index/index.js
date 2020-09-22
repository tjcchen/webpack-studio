import _ from 'lodash';
import { print } from './print';

function component() {
  const element = document.createElement('div');

  // Utilizes lodash convenience method 'join'
  element.innerHTML = _.join(['index.js', ':', 'hello', 'webpack', 2020, 'fall'], ' ');

  return element;
}

document.body.appendChild(component());

document.write(print());  // message from print.js