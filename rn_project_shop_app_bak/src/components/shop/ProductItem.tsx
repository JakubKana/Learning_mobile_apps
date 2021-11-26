import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";
import { Card } from "../UI/Card";
interface ProductItemProps {
  image: string;
  title: string;
  price: number;
  onSelect: () => void;
  children: React.ReactNode;
}

const ProductItem = (props: ProductItemProps) => {
  let TouchableComp: any = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.detail}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableComp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontFamily: "OpenSans-Bold",
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
  detail: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
});

export { ProductItem };
