module.exports = {
  root: true,
  extends: ["@react-native-community", "plugin:react-hooks/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    eqeqeq: 2,
    curly: 2,
    quotes: [2, "double"],
    "max-len": [
      "error",
      120,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: false,
        ignoreTemplateLiterals: false,
      },
    ],
    "react-native/no-inline-styles": 0,
  },
};
// "react-hooks/rules-of-hooks": "error",
// "react-hooks/exhaustive-deps": "warn"
