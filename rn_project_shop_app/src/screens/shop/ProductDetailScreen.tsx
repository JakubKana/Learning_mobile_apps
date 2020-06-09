import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, Image } from "react-native";
import { NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";
import { useSelector } from "react-redux";
import { RootState } from "./types";
interface ProductDetailScreenProps {
  navigation: NavigationStackProp;
}

const ProductDetailScreen = (props: ProductDetailScreenProps) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state: RootState) => state.products.availableProducts).find(
    prod => prod.id === productId,
  );

  return (
    <View>
      <Text>{selectedProduct?.title}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData: { navigation: NavigationStackProp }) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({});

export { ProductDetailScreen };
