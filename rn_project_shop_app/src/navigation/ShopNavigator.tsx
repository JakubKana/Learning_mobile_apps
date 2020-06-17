import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Platform } from "react-native";
import { Base } from "../constants/Colors";
import { KEYS } from "./NavigationKeys";
import { ProductDetailScreen, ProductsOverviewScreen, CartScreen, OrdersScreen } from "../screens/shop";
import { EditProductScreen, AuthScreen } from "../screens/user";
import { isAndroid } from "../lib/platform";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserProductsScreen } from "../screens/user/UserProductsScreen";

const defaultNavOptions = {
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
};

const drawerIconCreate = (drawerConfig: any) => {
  return <Ionicons name={isAndroid() ? "md-create" : "ios-create"} size={23} color={drawerConfig.tintColor} />;
};

const drawerIconList = (drawerConfig: any) => {
  return <Ionicons name={isAndroid() ? "md-list" : "ios-list"} size={23} color={drawerConfig.tintColor} />;
};

const drawerIconCart = (drawerConfig: any) => {
  return <Ionicons name={isAndroid() ? "md-cart" : "ios-cart"} size={23} color={drawerConfig.tintColor} />;
};

const ProductsNavigator = createStackNavigator(
  {
    [KEYS.ProductsOverview]: ProductsOverviewScreen,
    [KEYS.ProductDetail]: ProductDetailScreen,
    [KEYS.Cart]: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerIconCart,
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const OrdersNavigator = createStackNavigator(
  {
    [KEYS.Orders]: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerIconList,
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const AdminNavigator = createStackNavigator(
  {
    [KEYS.UserProducts]: UserProductsScreen,
    [KEYS.EditProduct]: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerIconCreate,
    },
    defaultNavigationOptions: defaultNavOptions,
  },
);

const ShopNavigator = createDrawerNavigator(
  {
    [KEYS.Products]: ProductsNavigator,
    [KEYS.Orders]: OrdersNavigator,
    [KEYS.Admin]: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Base.primary,
    },
  },
);

const AuthNavigator = createStackNavigator(
  { [KEYS.Auth]: AuthScreen },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
);

const MainNavigator = createSwitchNavigator({
  [KEYS.Auth]: AuthNavigator,
  [KEYS.Shop]: ShopNavigator,
});

const AppNavigator = createAppContainer(MainNavigator);

export { AppNavigator };
