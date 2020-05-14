import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { MEALS } from "../data/dummy-data";

interface MealDetailScreenProps {
  navigation: NavigationStackProp;
}

const MealDetailScreen = (props: MealDetailScreenProps): JSX.Element => {
  const mealId = props.navigation.getParam("mealId");

  const selectedMeal = MEALS.find(m => m.id === mealId);

  return (
    <View style={styles.screen}>
      <Text>{selectedMeal?.title}</Text>
      <Button
        title="Go Back to Categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};


MealDetailScreen.navigationOptions = (navigationData: any) => {
  const mealId = navigationData.navigation.getParam("mealId");
  const selectedMeal = MEALS.find(m => m.id === mealId);
  return { headerTitle: selectedMeal?.title };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { MealDetailScreen };
