import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { CategoriesScreen, CategoryMealScreen, MealDetailScreen, FavoritesScreen, FiltersScreen } from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/colors";
import { Platform, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

type TabInfo = {
  tintColor: string;
};

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  },
  headerTitleStyle: {
    fontFamily: "OpenSans-Bold",
  },
  headerBackTitleStyle: {
    fontFamily: "OpenSans-Regular",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitle: "A Screen",
};

// This overrides custom navigationOptions in specific screens and overrides defaultNavigationOptions
const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryMeals: {
      screen: CategoryMealScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    // initialRouteName: "Categories", by default uses first screen in the object above
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    // initialRouteName: "Categories", by default uses first screen in the object above
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const tabsScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo: TabInfo) => {
        return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primary,
      tabBarLabel: Platform.OS === "android" ? <Text style={{ fontFamily: "OpenSans-Bold" }}>Meals</Text> : "Meals",
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo: TabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accent,
      tabBarLabel:
        Platform.OS === "android" ? <Text style={{ fontFamily: "OpenSans-Bold" }}>Favorites</Text> : "Favorites",
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabsScreenConfig, {
        activeColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primary,
        },
      })
    : createBottomTabNavigator(tabsScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "OpenSans-Bold",
          },
          activeTintColor: Colors.accent,
        },
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    //   navigationOptions: {
    //     drawerLabel: "Filters!!!"
    //   },
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accent,
      activeBackgroundColor: Colors.accentBackground,
      labelStyle: {
        fontFamily: "OpenSans-Bold",
      },
    },
  },
);

const appContainer = createAppContainer(MainNavigator);

export { appContainer as MealsNavigatorContainer };
