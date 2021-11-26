import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";

import { useDispatch } from "react-redux";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Base } from "../constants/Colors";
import { ProductDetailScreen, ProductsOverviewScreen, CartScreen, OrdersScreen } from "../screens/shop";
import { screenOptions as ProductsOverviewScreenOptions } from "../screens/shop/ProductsOverviewScreen";
import { screenOptions as ProductDetailScreenOptions } from "../screens/shop/ProductDetailScreen";
import { screenOptions as CartScreenOptions } from "../screens/shop/CartScreen";
import { screenOptions as OrdersScreenOptions } from "../screens/shop/OrdersScreen";
import { screenOptions as UserProductsScreenOptions } from "../screens/user/UserProductsScreen";
import { screenOptions as EditProductScreenOptions } from "../screens/user/EditProductScreen";
import { screenOptions as AuthScreenOptions } from "../screens/user/AuthScreen";
import { EditProductScreen, AuthScreen } from "../screens/user";
import { isAndroid } from "../lib/platform";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UserProductsScreen } from "../screens/user/UserProductsScreen";
import * as authActions from "../store/actions/auth";
import {
  ProductsNavigatorStackParamList,
  OrdersNavigatorStackParamList,
  AdminNavigatorStackParamList,
  ShopNavigatorDrawerParamList,
  AuthNavigatorStackParamList,
} from "../screens/shop/types";

type ShopNavigatorProps = any;
// {
//   navigation: NavigationDrawerProp;
//   [name: string]: any;
// };

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

const drawerIconCreate = (props: any) => {
  return <Ionicons name={isAndroid() ? "md-create" : "ios-create"} size={23} color={props.color} />;
};

const drawerIconList = (props: any) => {
  return <Ionicons name={isAndroid() ? "md-list" : "ios-list"} size={23} color={props.color} />;
};

const drawerIconCart = (props: any) => {
  return <Ionicons name={isAndroid() ? "md-cart" : "ios-cart"} size={23} color={props.color} />;
};

const ProductsStackNavigator = createStackNavigator<ProductsNavigatorStackParamList>();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        options={ProductsOverviewScreenOptions}
        name="ProductsOverview"
        component={ProductsOverviewScreen}
      />
      <ProductsStackNavigator.Screen
        options={ProductDetailScreenOptions}
        name="ProductDetail"
        component={ProductDetailScreen}
      />
      <ProductsStackNavigator.Screen options={CartScreenOptions} name="Cart" component={CartScreen} />
    </ProductsStackNavigator.Navigator>
  );
};

// const ProductsNavigator = createStackNavigator(
//   {
//     [KEYS.ProductsOverview]: ProductsOverviewScreen,
//     [KEYS.ProductDetail]: ProductDetailScreen,
//     [KEYS.Cart]: CartScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerIconCart,
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   },
// );

const OrdersStackNavigator = createStackNavigator<OrdersNavigatorStackParamList>();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen name="Orders" component={OrdersScreen} options={OrdersScreenOptions} />
    </OrdersStackNavigator.Navigator>
  );
};

// const OrdersNavigator = createStackNavigator(
//   {
//     [KEYS.Orders]: OrdersScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerIconList,
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   },
// );

const AdminStackNavigator = createStackNavigator<AdminNavigatorStackParamList>();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        options={UserProductsScreenOptions}
        name="UserProducts"
        component={UserProductsScreen}
      />
      <AdminStackNavigator.Screen options={EditProductScreenOptions} name="EditProduct" component={EditProductScreen} />
    </AdminStackNavigator.Navigator>
  );
};
// const AdminNavigator = createStackNavigator(
//   {
//     [KEYS.UserProducts]: UserProductsScreen,
//     [KEYS.EditProduct]: EditProductScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerIconCreate,
//     },
//     defaultNavigationOptions: defaultNavOptions,
//   },
// );

const ShopDrawerNavigator = createDrawerNavigator<ShopNavigatorDrawerParamList>();

const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props: ShopNavigatorProps) => {
        return (
          <View style={{ flex: 1, padding: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Base.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate(KEYS.Auth);
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Base.primary,
      }}>
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: drawerIconCart,
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: drawerIconList,
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: drawerIconCreate,
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

// const ShopNavigator = createDrawerNavigator(
//   {
//     [KEYS.Products]: ProductsNavigator,
//     [KEYS.Orders]: OrdersNavigator,
//     [KEYS.Admin]: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Base.primary,
//     },
//     contentComponent: drawerComponent,
//   },
// );

const AuthStackNavigator = createStackNavigator<AuthNavigatorStackParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={AuthScreenOptions} />
    </AuthStackNavigator.Navigator>
  );
};

// const AuthNavigator = createStackNavigator(
//   { [KEYS.Auth]: AuthScreen },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//   },
// );

// const MainNavigator = createSwitchNavigator({
//   [KEYS.Startup]: StartupScreen,
//   [KEYS.Auth]: AuthNavigator,
//   [KEYS.Shop]: ShopNavigator,
// });

// const AppNavigator = createAppContainer(MainNavigator);

export { ProductsNavigator, ShopNavigator };
