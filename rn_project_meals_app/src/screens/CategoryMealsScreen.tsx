import React from "react";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { MealList } from "../components/MealList";

interface CategoryMealScreenProps {
  navigation: StackNavigationProp;
}

const CategoryMealScreen = (props: CategoryMealScreenProps): JSX.Element => {
  const categoryId = props.navigation.getParam("categoryId");

  const displayedMeals = MEALS.filter(m => m.categoryIds.indexOf(categoryId) >= 0);

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

export { CategoryMealScreen };
