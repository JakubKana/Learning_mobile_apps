import React, { ReactNode } from "react";
import { Text, StyleSheet } from "react-native";

interface DefaultTextProps {
  children: ReactNode;
}

const DefaultText = (props: DefaultTextProps) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "OpenSans-Regular",
  },
});

export { DefaultText };
