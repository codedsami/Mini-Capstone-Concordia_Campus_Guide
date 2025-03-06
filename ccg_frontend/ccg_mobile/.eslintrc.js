module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'react-native/react-native': true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-console": "off",
    "react/prop-types": "off",
    "no-undef": "off",
    "react/display-name": "off",
    "react-native/no-unused-styles": "warn",
    "react-native/no-inline-styles": "warn",
    "react-native/no-color-literals": "warn",
  },
};
