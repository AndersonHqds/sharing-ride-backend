module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  "plugins": [
    "sort-requires"
  ],
  rules: {
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    "no-confusing-arrow": ["error", {"allowParens": false}],
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "sort-requires/sort-requires": 2,
    "template-curly-spacing": "off"
  },
};
