import largeNumber from 'large-number-webpack-bundle';

console.log(largeNumber);

const sum = largeNumber.add('9999', '1');

document.write('<br/>');
document.write('9999 + 1: ' + sum);