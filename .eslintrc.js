module.exports = {
  extends: ['plugin:vue/vue3-essential'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue'],
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'global-require': 0,
    //强制使用单引号
    quotes: ['error', 'single'],
    indent: 0,
    'no-new': 0,
    camelcase: 0,
    'padded-blocks': 0,
    'no-unused-vars': 0,
    'no-trailing-spaces': 0,
    'no-mixed-spaces-and-tabs': 0,
    'space-before-function-paren': [0, 'always'],
    'no-multiple-empty-lines': 0
    // 自己写一些想配置的规则
  },
  overrides: [{
    files: ['*.vue', '*.jsx', '*.js'],
    rules: {
      // 这里写覆盖vue文件的规则
    },
  }],
};
