import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ImageBackground,
} from "react-native";

interface MealItemProps {
  title: string;
  duration: number;
  complexity: string;
  affordability: string;
  image: string;
  onSelectMeal: () => void;
}

const MealItem = (props: MealItemProps) => {
  let TouchableComponent: any = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.mealItem}>
      <TouchableComponent onPress={props.onSelectMeal}>
        <View>
          <View style={[styles.mealRow, styles.mealHeader]}>
            <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={[styles.mealRow, styles.mealDetail]}>
            <Text>{props.duration}m</Text>
            <Text>{props.complexity.toUpperCase()}</Text>
            <Text>{props.affordability.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
    borderRadius: 10,
    overflow: "hidden",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

export { MealItem };
