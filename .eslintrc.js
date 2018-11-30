module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  settings: {
    'import/resolver': {
      'webpack': {
        config: {
          resolve: {
            extensions: ['.js', '.vue'],
            alias: {
              '~': __dirname,
            }
          }
        }
      }
    }
  },
};
