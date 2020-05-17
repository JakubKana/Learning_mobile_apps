import React, { ReactNode, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { HeaderButton } from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DefaultText } from "../components/DefaultText";
import { Image } from "react-native";
import { RootState } from "../App";
import { toggleFavorite } from "../store/actions/meals";

interface MealDetailScreenProps {
  navigation: NavigationStackProp;
}
interface ListItemProps {
  children: ReactNode;
}

const ListItem = (props: ListItemProps) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props: MealDetailScreenProps): JSX.Element => {
  const availableMeals = useSelector((state: RootState) => state.meals.meals);
  const mealId = props.navigation.getParam("mealId");
  const currentMealIsFav = useSelector((state: RootState) => state.meals.favoriteMeals.some(fm => fm.id === mealId));

  const selectedMeal = availableMeals.find(m => m.id === mealId);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   props.navigation.setParams({ mealTitle: selectedMeal?.title });
  // }, [selectedMeal]);

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFav });
  }, [currentMealIsFav]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal?.imageUrl }} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal?.duration}m</DefaultText>
        <DefaultText>{selectedMeal?.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal?.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal?.ingredients.map(i => (
        <ListItem key={i}>{i}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal?.steps.map(s => (
        <ListItem key={s}>{s}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData: any) => {
  // const mealId = navigationData.navigation.getParam("mealId");
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFav = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Favorite" iconName={isFavorite ? "md-star" : "md-star-outline"} onPress={toggleFav} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: { width: "100%", height: 200 },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 22,
    textAlign: "center",
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export { MealDetailScreen };
