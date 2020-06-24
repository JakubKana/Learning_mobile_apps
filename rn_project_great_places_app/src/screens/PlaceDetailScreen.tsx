import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

const PlaceDetailScreen = () => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = (navData: { navigation: NavigationStackProp }) => {
  return { headerTitle: navData.navigation.getParam("placeTitle") };
};

const styles = StyleSheet.create({});

export { PlaceDetailScreen };
