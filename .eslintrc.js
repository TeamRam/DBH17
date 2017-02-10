module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',  
  rules: {
    'comma-dangle': [2, 'only-multiline'],
    'arrow-body-style': [0, 'as-needed'],
    'react/prop-types': [0, { ignore: [], customValidators: [] }],
    'import/prefer-default-export': 0,
    'no-use-before-define': 0,
    'no-console': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/img-has-alt': 0,
  },
  plugins: [
    'react'
  ]
};