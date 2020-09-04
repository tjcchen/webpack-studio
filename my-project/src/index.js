import _ from 'lodash';

function component() {
  const element = document.createElement('div');

  // Utilizes lodash convenience method
  element.innerHTML = _.join(['hello', 'webpack', 2020], ' ');

  return element;
}

document.body.appendChild(component());