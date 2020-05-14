import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { Meal } from "../models/meals";
import { ItemData } from "../lib/types";
import { MealItem } from "../components/MealItem";
import { ROUTE_NAMES } from "../navigation/names";

interface CategoryMealScreenProps {
  navigation: StackNavigationProp;
}

const CategoryMealScreen = (props: CategoryMealScreenProps): JSX.Element => {
  const renderMealItem = (itemData: ItemData<Meal>) => {
    const { title, duration, complexity, affordability, imageUrl } = itemData.item;
    return (
      <MealItem
        title={title}
        duration={duration}
        complexity={complexity}
        affordability={affordability}
        image={imageUrl}
        onSelectMeal={() => {
          props.navigation.navigate(ROUTE_NAMES.mealDetail, {
            mealId: itemData.item.id,
          });
        }}
      />
    );
  };

  const categoryId = props.navigation.getParam("categoryId");

  const displayedMeals = MEALS.filter(m => m.categoryIds.indexOf(categoryId) >= 0);

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={styles.categoryList}
      />
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
  categoryList: {
    width: "100%",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export { CategoryMealScreen };
