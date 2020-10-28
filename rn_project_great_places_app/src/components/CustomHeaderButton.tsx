import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Platform } from "react-native";
import { Colors } from "../constants/colors";

interface CustomHeaderButtonProps {
  title: string;
  [name: string]: any;
}

const CustomHeaderButton = (props: CustomHeaderButtonProps) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export { CustomHeaderButton };