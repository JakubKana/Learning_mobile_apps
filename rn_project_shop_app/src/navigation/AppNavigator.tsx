import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ProductsNavigator } from "./ShopNavigator";
import { RootState } from "../screens/shop/types";
import { useSelector } from "react-redux";
import { KEYS } from "./NavigationKeys";
import { ProductsOverviewScreen } from "../screens/shop";

interface NavigationContainerProps {}

// This is component
const StackNav = createStackNavigator();

const AppNavigator = (_props: NavigationContainerProps) => {
  const isAuth = useSelector((state: RootState) => !!state.auth.token);
  // const navRef = useRef<any>();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navRef.current.dispatch(NavigationActions.navigate({ routeName: KEYS.Auth }));
  //   }
  // }, [isAuth]);

  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
};

export { AppNavigator };
