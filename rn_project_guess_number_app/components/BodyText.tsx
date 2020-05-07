import React from "react";
import { Text, StyleSheet } from "react-native";

interface BodyTextProps {
  children: React.ReactNode;
}

const BodyText = (props: BodyTextProps) => {
  return <Text style={styles.body}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "OpenSans-Regular",
    fontSize: 18,
  },
});

export { BodyText };
