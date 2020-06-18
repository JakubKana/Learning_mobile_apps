import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Base } from "../constants/Colors";
import { KEYS } from "../navigation/NavigationKeys";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { UserData } from "../store/actions/auth";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

interface StartupScreenProps {
  navigation: StackNavigationProp;
}

const StartupScreen = (props: StartupScreenProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem(authActions.USERDATA_KEY);
      if (!userData) {
        props.navigation.navigate(KEYS.Auth);
        return;
      }
      const transData: UserData = JSON.parse(userData);
      const { token, userId, expirationDate } = transData;
      const expiryDate = new Date(expirationDate);
      if (expiryDate <= new Date() || !token || !userId) {
        props.navigation.navigate(KEYS.Auth);
        return;
      }

      const expirationTime = expiryDate.getTime() - new Date().getTime();
      props.navigation.navigate(KEYS.Shop);
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Base.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { StartupScreen };
