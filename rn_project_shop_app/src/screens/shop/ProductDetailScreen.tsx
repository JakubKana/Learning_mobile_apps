import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, Image, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./types";
import { Base } from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  ProductDetail: { productId: string; productTitle: string };
};

type ProductDetailScreenNavigationProp = StackNavigationProp<{ ProductDetail: { productId: string } }, "ProductDetail">;

interface ProductDetailScreenProps {
  navigation: ProductDetailScreenNavigationProp;
}

const ProductDetailScreen = (props: ProductDetailScreenProps) => {
  const productId = props.navigation.route.params.productId;
  const selectedProduct = useSelector((state: RootState) => state.products.availableProducts).find(
    prod => prod.id === productId,
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct?.imageUrl }} />
      <View style={styles.action}>
        <Button
          color={Base.primary}
          title="Add to Cart"
          onPress={() => {
            if (selectedProduct) {
              dispatch(cartActions.addToCart(selectedProduct));
            } else {
              Alert.alert("Error", "Product not found. Cannot add to cart.");
            }
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct?.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct?.description}</Text>
    </ScrollView>
  );
};

export const screenOptions = (navData: { navigation: StackNavigationProp }) => {
  return {
    headerTitle: navData.navigation.route.params.productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  action: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "OpenSans-Bold",
  },
  description: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export { ProductDetailScreen };
