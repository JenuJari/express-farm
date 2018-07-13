// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
      node   : true,
      es6    : true,
      browser: true,
      jquery : true
    },
    globals: {
      $          : true,
      moment     : true,
      _          : true,
      redux_store: true
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: ["eslint:recommended", "plugin:react/recommended"],
    // required to lint *.vue files
    plugins: [
      'html', 'react'
    ],
    // add your custom rules here
    'rules': {
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      'no-undef': 0,
      'no-unused-vars' : 1,
      'react/no-find-dom-node' : 0,
      "react/jsx-uses-react": 2,
      "react/jsx-uses-vars": 2,
    }
  }
