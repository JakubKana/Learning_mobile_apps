import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { MealsNavigatorContainer } from "./navigation/MealsNavigatorInit";
const App: () => JSX.Element = () => {
  return <MealsNavigatorContainer />;
};

const styles = StyleSheet.create({});

export { App };
