"use strict";

module.exports = {
  root: true,
  extends: ["eslint:recommended", "prettier"],
  // parser: "@babel/eslint-parser", // To use, uncomment this line and run `npm install eslint @babel/core @babel/eslint-parser --save-dev`
  parserOptions: {
    ecmaFeatures: {
      globalReturn: true,
    },
    ecmaVersion: 2019,
    sourceType: "module",
  },
  globals: {
    kandji: false,
  },
  env: {
    browser: true,
    es6: true,
  },
  plugins: [],
  settings: {},
  rules: {
    quotes: ["error", "double"],
    "no-console": 0,
    "no-undef": 0,
    "no-unused-vars": 0,
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "ignore",
      },
    ],
  },
};
