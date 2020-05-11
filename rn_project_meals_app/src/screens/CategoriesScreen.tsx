import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

interface CategoriesScreenProps {
  navigation: NavigationStackProp;
}

const CategoriesScreen = (props: CategoriesScreenProps) => {
  console.log(props);
  return (
    <View style={styles.screen}>
      <Text>The CategoriesScreen</Text>
      <Button
        title="Go to meals"
        onPress={() => {
          props.navigation.navigate({ routeName: "CategoryMeals" });
        }}
      />
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

export { CategoriesScreen };
