import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { TitleText } from "./TitleText";

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({ android: styles.headerAndroid, ios: styles.headerIOS }),
      }}>
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  title: {
    color: Platform.OS === "ios" ? Colors.primary : "white",
  },
});

export { Header };
