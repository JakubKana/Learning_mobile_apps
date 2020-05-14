import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { CategoriesScreen } from "../screens/CategoriesScreen";
import { CategoryMealScreen } from "../screens/CategoryMealsScreen";
import { MealDetailScreen } from "../screens/MealDetailScreen";
import { Colors } from "../constants/colors";
import { Platform } from "react-native";

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
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      headerTitle: "A Screen",
    },
  },
);

const appContainer = createAppContainer(MealsNavigator);

export { appContainer as MealsNavigatorContainer };
