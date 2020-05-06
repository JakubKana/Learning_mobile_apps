import React from "react";
import { TextInput, StyleSheet, TextInputProps, TextStyle } from "react-native";

interface InputProps extends TextInputProps {
  style?: TextStyle;
}

const Input = (props: InputProps) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export { Input };
