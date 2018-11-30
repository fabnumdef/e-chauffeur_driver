module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'max-len': ['error', { code: 120 }],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['.js', '.vue'],
            alias: {
              '~': __dirname,
            },
          },
        },
      },
    },
  },
};
