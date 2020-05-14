import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";

interface MealDetailScreenProps {
  navigation: NavigationStackProp;
}

const MealDetailScreen = (props: MealDetailScreenProps): JSX.Element => {
  return (
    <View style={styles.screen}>
      <Text>The MealDetail Screen</Text>
      <Button
        title="Go Back to Categories"
        onPress={() => {
          props.navigation.popToTop();
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

export { MealDetailScreen };
