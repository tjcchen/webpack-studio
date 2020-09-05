let promise = new Promise((resolve, reject) => {
  let a = 1 + 2;
  if (a === 2) {
    resolve('Success')
  } else {
    reject('Failed');
  }
});

export default promise;