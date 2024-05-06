module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    plugins: [
      '@typescript-eslint',
      'prettier'
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      indent: ['error', 2],
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': ['error', {
        semi: true,
        singleQuote: true,
        trailingComma: 'es5'
      }],
    },
  };
  