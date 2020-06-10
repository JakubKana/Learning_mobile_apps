import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import { Base } from "../constants/Colors";
import { KEYS } from "./NavigationKeys";
import { ProductDetailScreen, ProductsOverviewScreen, CartScreen } from "../screens/shop";

const ProductsNavigator = createStackNavigator(
  {
    [KEYS.ProductsOverview]: ProductsOverviewScreen,
    [KEYS.ProductDetail]: ProductDetailScreen,
    [KEYS.Cart]: CartScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Base.primary : "",
      },
      headerTitleStyle: {
        fontFamily: "OpenSans-Bold",
      },
      headerBackTitleStyle: {
        fontFamily: "OpenSans-Regular",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Base.primary,
    },
  },
);

const ShopNavigator = createAppContainer(ProductsNavigator);

export { ShopNavigator };
