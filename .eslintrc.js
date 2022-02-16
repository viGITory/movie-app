module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-base', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/rule-name': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-use-before-declare': true,
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
