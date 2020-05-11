import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CategoriesScreenProps {}

const CategoriesScreen = (props: CategoriesScreenProps) => {
  return (
    <View style={styles.screen}>
      <Text>The CategoriesScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    fles: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { CategoriesScreen };
