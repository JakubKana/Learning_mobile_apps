import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Colors } from "../constants/colors";

interface MainButtonProps {
  children: React.ReactNode;
  buttonStyle?: ViewStyle;
  onPress: () => void;
}

const MainButton = (props: MainButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={props.onPress}>
      <View style={{ ...styles.button, ...props.buttonStyle }}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.button,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
  },
});

export { MainButton };
