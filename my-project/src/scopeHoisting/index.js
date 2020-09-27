import { common } from '../../common';
import { scopeHoisting } from './scopeHoisting';

document.write(scopeHoisting());
console.log(common());

const exportingFunc = function() {
  return 'scope hoisting exporting funcion';
};

export default exportingFunc;