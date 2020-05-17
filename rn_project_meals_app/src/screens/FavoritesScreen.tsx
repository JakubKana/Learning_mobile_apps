import React from "react";
import { MealList } from "../components/MealList";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton } from "../components/HeaderButton";
import { RootState } from "../App";
import { View, StyleSheet } from "react-native";
import { DefaultText } from "../components/DefaultText";

interface FavoritesScreenProps {
  navigation: StackNavigationProp;
}

const FavoritesScreen = (props: FavoritesScreenProps): JSX.Element => {
  const favMeals = useSelector((state: RootState) => state.meals.favoriteMeals);

  if (favMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found. Start adding some!</DefaultText>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { FavoritesScreen };
