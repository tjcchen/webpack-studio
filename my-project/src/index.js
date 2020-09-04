import _ from 'lodash';

function component() {
  const element = document.createElement('div');

  // Utilizes lodash convenience method
  element.innerHTML = _.join(['index.js', ':', 'hello', 'webpack', 2020, 'fall'], ' ');

  return element;
}

document.body.appendChild(component());