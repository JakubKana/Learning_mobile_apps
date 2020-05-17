import React from "react";
import { useSelector } from "react-redux";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { CATEGORIES } from "../data/dummy-data";
import { MealList } from "../components/MealList";
import { RootState } from "../App";
import { DefaultText } from "../components/DefaultText";
import { View, StyleSheet } from "react-native";

interface CategoryMealScreenProps {
  navigation: StackNavigationProp;
}

const CategoryMealScreen = (props: CategoryMealScreenProps): JSX.Element => {
  const categoryId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector((state: RootState) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(m => m.categoryIds.indexOf(categoryId) >= 0);

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters!</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

// For dynamic configuration use function
//@ts-ignore
CategoryMealScreen.navigationOptions = (navigationData: { navigation: StackNavigationProp }) => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(c => c.id === categoryId);

  return {
    headerTitle: selectedCategory?.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { CategoryMealScreen };
