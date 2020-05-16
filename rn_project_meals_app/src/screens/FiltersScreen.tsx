import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton } from "../components/HeaderButton";
import { Switch } from "react-native-paper";
import { Colors } from "../constants/colors";
import { NavigationStackProp } from "react-navigation-stack";
import { NavigationDrawerProp } from "react-navigation-drawer";

interface FiltersScreenProps {
  navigation: NavigationStackProp;
}

interface FilterSwitchProps {
  onChange: (newValue: boolean) => void;
  label: string;
  state: boolean;
}

const FilterSwitch = (props: FilterSwitchProps) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primary, false: "" }}
        thumbColor={Platform.OS === "android" ? Colors.primary : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = (props: FiltersScreenProps): JSX.Element => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState<boolean>(false);
  const [isLactoseFree, setIsLactoseFree] = useState<boolean>(false);
  const [isVegan, setIsVegan] = useState<boolean>(false);
  const [isVegetarian, setIsVegetarian] = useState<boolean>(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    console.log(appliedFilters);
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);
  // If you had existin params, you still use setParams(). Your new params get merged with existing params.
  useEffect(() => {
    props.navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch label={"Gluten-free"} state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
      <FilterSwitch label={"Lactose-free"} state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
      <FilterSwitch label={"Vegan"} state={isVegan} onChange={newValue => setIsVegan(newValue)} />
      <FilterSwitch label={"Vegetarian"} state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData: { navigation: NavigationDrawerProp }) => {
  return {
    headerTitle: "Filters Meals",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={() => {
            navData.navigation.getParam("save")();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export { FiltersScreen };
