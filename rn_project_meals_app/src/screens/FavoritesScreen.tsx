import React from "react";
import { MealList } from "../components/MealList";
import { MEALS } from "../data/dummy-data";

import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton } from "../components/HeaderButton";

interface FavoritesScreenProps {
  navigation: StackNavigationProp;
}

const FavoritesScreen = (props: FavoritesScreenProps): JSX.Element => {
  const favMeals = MEALS.filter(m => m.id === "m1" || m.id === "m2");

  return <MealList listData={favMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: "Your favourites",
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

export { FavoritesScreen };
