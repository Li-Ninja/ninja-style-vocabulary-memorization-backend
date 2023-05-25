/** @type { import('eslint').Linter.Config } */
module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['.eslintrc.js'],
  extends: [
    '@ninjaccc/eslint-config',
  ],
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off'
  }
};
