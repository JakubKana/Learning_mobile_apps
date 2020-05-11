import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface FavoritesScreenProps {}

const FavoritesScreen = (props: FavoritesScreenProps) => {
  return (
    <View style={styles.screen}>
      <Text>The Favorites Screen</Text>
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

export { FavoritesScreen };
