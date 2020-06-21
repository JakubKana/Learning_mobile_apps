import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton } from "../components/CustomHeaderButton";
import { isAndroid } from "../lib/platform";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { KEYS } from "../navigation/NavigationKeys";

interface PlacesListScreenProps {}

const PlacesListScreen = (_props: PlacesListScreenProps) => {
  return (
    <View>
      <Text>PlacesListScreen</Text>
    </View>
  );
};

PlacesListScreen.navigationOptions = (navData: { navigation: StackNavigationProp }) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Place"
          iconName={isAndroid() ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate(KEYS.NewPlace);
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export { PlacesListScreen };
