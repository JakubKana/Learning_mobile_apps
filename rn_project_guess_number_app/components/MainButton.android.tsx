import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ViewStyle,
  Platform,
} from "react-native";
import { Colors } from "../constants/colors";

interface MainButtonProps {
  children: React.ReactNode;
  buttonStyle?: ViewStyle;
  onPress: () => void;
}

const MainButton = (props: MainButtonProps) => {
  let ButtonComponent: any = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style={{ ...styles.button, ...props.buttonStyle }}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
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
