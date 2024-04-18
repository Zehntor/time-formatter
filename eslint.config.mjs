import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          impliedStrict: true
        },
        project: "./tsconfig-eslint.json",
      }
    },
    plugins: { jsdoc },
    rules: {
      // 0 = off, 1 = warn, 2 = error
      'no-console': 0,
      'no-prototype-builtins': 0,
      'no-case-declarations': 0,
      'no-empty-pattern': 0,
      camelcase: 1,

      '@typescript-eslint/no-unused-vars': 1,
      '@typescript-eslint/await-thenable': 1,
      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-non-null-assertion': 0,

      'jsdoc/require-jsdoc': 1,
      'jsdoc/require-description': 1,
      'jsdoc/check-param-names': 1,
      'jsdoc/require-param-description': 1,
      'jsdoc/require-hyphen-before-param-description': 1,
      'jsdoc/require-returns': 1,
      'jsdoc/require-throws': 1
    }
  }
];
