import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface TitleTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const TitleText = (props: TitleTextProps) => {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 18,
  },
});

export { TitleText };
