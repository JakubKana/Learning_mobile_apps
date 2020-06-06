import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import { ProductsOverviewScreen } from "../screens/shop/ProductsOverviewScreen";
import { Base } from "../constants/Colors";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Base.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Base.primary,
    },
  },
);

const ShopNavigator = createAppContainer(ProductsNavigator);

export { ShopNavigator };
