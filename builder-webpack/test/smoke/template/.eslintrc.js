module.exports = {
  parser: 'babel-eslint', // npm i babel-eslint -D
  extends: 'airbnb', // extends from airbnb syntax linter
  env: { // specify eslint environment
    browser: true,
    node: true,
  },
  rules: { // custom js syntax validation rules
    indent: ['error', 2],
  },
};
