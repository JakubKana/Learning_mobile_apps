module.exports = {
  root: true,
  extends: "@react-native-community",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    eqeqeq: 2,
    curly: 1,
    quotes: [2, "double"],
  },
};
