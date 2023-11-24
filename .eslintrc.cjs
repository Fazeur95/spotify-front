// .eslintrc.js
module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Intégration de Prettier
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  settings: {react: {version: '18.2'}},
  plugins: ['react-refresh', 'prettier'], // Ajout du plugin Prettier
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'react/no-unescaped-entities': 'off',
    'prettier/prettier': ['error', {endOfLine: 'auto'}], // Règles Prettier
  },
};
