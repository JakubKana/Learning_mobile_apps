import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Colors } from "../constants/colors";
import { Platform } from "react-native";

interface CustomHeaderButtonProps {
  title: string;
  [name: string]: any;
}

const CustomHeaderButton = (props: CustomHeaderButtonProps) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={20}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export { CustomHeaderButton as HeaderButton };
