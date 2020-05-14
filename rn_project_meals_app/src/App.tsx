import React from "react";
import { StyleSheet } from "react-native";

import { enableScreens } from "react-native-screens";
import { MealsNavigatorContainer } from "./navigation/MealsNavigator";

enableScreens(true);

const App: () => JSX.Element = () => {
  return <MealsNavigatorContainer />;
};

const styles = StyleSheet.create({});

export { App };
