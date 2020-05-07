import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface BodyTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const BodyText = (props: BodyTextProps) => {
  return (
    <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "OpenSans-Regular",
    fontSize: 18,
  },
});

export { BodyText };
