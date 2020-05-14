import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";

const MealItem = (props: MealItemProps) => {
  let TouchableComponent: any = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <TouchableComponent>
      <View>
        <Text>{itemData.item.title}</Text>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({});
