import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../screens/shop/types";
import { AppNavigator } from "./ShopNavigator";
import { NavigationActions } from "react-navigation";
import { KEYS } from "./NavigationKeys";
interface NavigationContainerProps {}

const NavigationContainer = (_props: NavigationContainerProps) => {
  const isAuth = useSelector((state: RootState) => !!state.auth.token);
  const navRef = useRef<any>();
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({ routeName: KEYS.Auth }));
    }
  }, [isAuth]);
  return <AppNavigator ref={navRef} />;
};

export { NavigationContainer };
