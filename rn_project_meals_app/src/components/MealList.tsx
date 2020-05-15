import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ItemData } from "../lib/types";
import { Meal } from "../models/meals";
import { MealItem } from "./MealItem";
import { ROUTE_NAMES } from "../navigation/names";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";

interface MealListProps {
  listData: Meal[];
  navigation: StackNavigationProp;
}

const MealList = (props: MealListProps) => {
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

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={props.listData}
        keyExtractor={item => item.id}
        renderItem={renderMealItem}
        style={styles.categoryList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryList: {
    width: "100%",
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export { MealList };
