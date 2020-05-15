import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Platform, TouchableNativeFeedback } from "react-native";

interface CategoryGridItemProps {
  onSelect: () => void;
  title: string;
  color: string;
}

const CategoryGridItem = (props: CategoryGridItemProps) => {
  let TouchableComponent: any = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridItem}>
      <TouchableComponent style={styles.gridTouchable} onPress={props.onSelect}>
        <View style={[styles.container, { backgroundColor: props.color }]}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  gridTouchable: {
    flex: 1,
  },
  gridItem: {
    flex: 1,
    borderRadius: 10,
    overflow: Platform.OS === "android" && Platform.Version >= 21 ? "hidden" : "visible",
    margin: 15,
    height: 120,
    elevation: 5,
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 22,
    textAlign: "right",
  },
});

export { CategoryGridItem };
