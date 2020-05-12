import React from "react";
import { StyleSheet, FlatList, View, Platform, Text, TouchableOpacity } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

import { CATEGORIES } from "../data/dummy-data";
import { ItemData } from "../lib/types";
import { Category } from "../models/category";
import { NAMES } from "../navigation/names";
import { Colors } from "../constants/colors";

interface CategoriesScreenProps {
  navigation: NavigationStackProp;
}
// interface Element {
//   [key: string]: any;
// }

const CategoriesScreen: Element = (props: CategoriesScreenProps) => {
  const renderGridItem = (itemData: ItemData<Category>) => {
    return (
      <TouchableOpacity
        style={styles.mealItem}
        onPress={() => {
          props.navigation.navigate({
            routeName: NAMES.categoryMeals,
            params: {
              categoryId: itemData.item.id,
            },
          });
          // alternative (Names.categoryMeals, {categoryID: YOUR_DATA})
        }}>
        <View>
          <Text>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList keyExtractor={(item, index) => item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

//@ts-ignore
CategoriesScreen.navigationOptions = {
  headerTitle: "Meals Categories",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mealItem: {
    flex: 1,
    margin: 15,
    height: 120,
  },
});

export { CategoriesScreen };
