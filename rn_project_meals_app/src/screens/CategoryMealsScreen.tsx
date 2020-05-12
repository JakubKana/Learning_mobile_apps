import React from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { NAMES } from "../navigation/names";
import { CATEGORIES } from "../data/dummy-data";
import { Colors } from "../constants/colors";

interface CategoryMealScreenProps {
  navigation: StackNavigationProp;
}

const CategoryMealScreen = (props: CategoryMealScreenProps) => {
  const categoryId = props.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(c => c.id === categoryId);
  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen</Text>
      <Text>{selectedCategory?.title}</Text>
      <Button
        title="Go to meal detail"
        onPress={() => {
          props.navigation.navigate({ routeName: NAMES.mealDetail });
        }}
      />
      <Button
        title="Go Back"
        onPress={() => {
          props.navigation.pop();
        }}
      />
    </View>
  );
};

// For dynamic configuration use function
//@ts-ignore
CategoryMealScreen.navigationOptions = (navigationData: any) => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(c => c.id === categoryId);

  return {
    headerTitle: selectedCategory?.title,
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { CategoryMealScreen };
