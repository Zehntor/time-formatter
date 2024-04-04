module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true
    },
    project: './tsconfig-eslint.json'
  },
  env: {
    node: true,
    es2022: true,
    mocha: true
  },
  plugins: ['@typescript-eslint', 'jsdoc', 'prettier', 'unused-imports'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  // 0 = off, 1 = warn, 2 = error
  rules: {
    'no-console': 0,
    'no-prototype-builtins': 0,
    'no-case-declarations': 0,
    'no-empty-pattern': 0,
    camelcase: 1,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/await-thenable': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'jsdoc/require-jsdoc': 1,
    'jsdoc/require-description': 1,
    'jsdoc/check-param-names': 1,
    'jsdoc/require-param-description': 1,
    'jsdoc/require-hyphen-before-param-description': 1,
    'jsdoc/require-returns': 1,
    'jsdoc/require-throws': 1,
    'unused-imports/no-unused-imports-ts': 2
  },
  ignorePatterns: ['webpack.*']
};
