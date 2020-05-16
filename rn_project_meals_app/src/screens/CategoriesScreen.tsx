import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { NavigationDrawerProp } from "react-navigation-drawer";

import { CATEGORIES } from "../data/dummy-data";
import { CategoryGridItem } from "../components/CategoryGridItem";
import { ItemData } from "../lib/types";
import { Category } from "../models/category";
import { ROUTE_NAMES } from "../navigation/names";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton } from "../components/HeaderButton";
import { NavigationStackProp } from "react-navigation-stack";
interface CategoriesScreenProps {
  navigation: NavigationStackProp;
}
// interface Element {
//   [key: string]: any;
// }

const CategoriesScreen = (props: CategoriesScreenProps): JSX.Element => {
  const renderGridItem = (itemData: ItemData<Category>) => {
    return (
      <CategoryGridItem
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          // alternative (Names.categoryMeals, {categoryID: YOUR_DATA})
          props.navigation.navigate({
            routeName: ROUTE_NAMES.categoryMeals,
            params: {
              categoryId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return <FlatList keyExtractor={item => item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />;
};

//@ts-ignore
CategoriesScreen.navigationOptions = (navData: { navigation: NavigationDrawerProp }) => {
  return {
    headerTitle: "Meals Categories",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { CategoriesScreen };
