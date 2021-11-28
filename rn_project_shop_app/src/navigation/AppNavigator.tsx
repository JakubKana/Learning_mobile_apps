import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ShopNavigator, AuthNavigator } from "./ShopNavigator";
import { StartupScreen } from "../screens/StartUpScreen";
import { RootState } from "../screens/shop/types";
import { useSelector } from "react-redux";

interface NavigationContainerProps {}

// This is component

const AppNavigator = (_props: NavigationContainerProps) => {
  const isAuth = useSelector((state: RootState) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state: RootState) => state.auth.didTryAutoLogin);
  // const navRef = useRef<any>();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navRef.current.dispatch(NavigationActions.navigate({ routeName: KEYS.Auth }));
  //   }
  // }, [isAuth]);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export { AppNavigator };
