import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { Meal } from "../models/meals";
import { ItemData } from "../lib/types";

interface CategoryMealScreenProps {
  navigation: StackNavigationProp;
}

const CategoryMealScreen = (props: CategoryMealScreenProps): JSX.Element => {
  const renderMealItem = (itemData: ItemData<Meal>) => {
    return (
      <View>
        <Text>{itemData.item.title}</Text>
      </View>
    );
  };

  const categoryId = props.navigation.getParam("categoryId");

  const displayedMeals = MEALS.filter(m => m.categoryIds.indexOf(categoryId) >= 0);

  return (
    <View style={styles.screen}>
      <FlatList data={displayedMeals} keyExtractor={(item, index) => item.id} renderItem={renderMealItem} />
    </View>
  );
};

{
  /* <Text>The Category Meal Screen</Text>
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
/> */
}

// For dynamic configuration use function
//@ts-ignore
CategoryMealScreen.navigationOptions = (navigationData: any) => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(c => c.id === categoryId);

  return {
    headerTitle: selectedCategory?.title,
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
