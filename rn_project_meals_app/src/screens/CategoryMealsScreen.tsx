import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CategoryMealScreenProps {}

const CategoryMealScreen = (props: CategoryMealScreenProps) => {
  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen</Text>
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

export { CategoryMealScreen };
