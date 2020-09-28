module.exports = {
  "root": true,
    "env": {
      "node": true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  rules: {
    'no-debugger': 'warn',
    'no-unused-vars': "warn",
    'no-empty': 'warn'
  }
}
