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
  },
};
// "react-hooks/rules-of-hooks": "error",
// "react-hooks/exhaustive-deps": "warn"