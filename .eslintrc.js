module.exports = {
  env: {
    browser: true,
    es6: true,
    webextensions: true
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:vue/recommended',
    'plugin:import/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  rules: {
    curly: ['error', 'all'],
    'id-length': ['error', {
      min: 2,
      properties: 'never'
    }]
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.js', '.json', '.vue']
      }
    }
  },
  overrides: [{
    files: ['src/**/*.test.js?(x)'],
    env: { jest: true }
  }]
}
