import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "./types";
import { Base } from "../../constants/Colors";

interface CartScreenProps {}

const CartScreen = (_props: CartScreenProps) => {
  const cartTotalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const cartItems = useSelector((state: RootState) => {
    const cartItemsRemapped = [];
    for (const key in state.cart.items) {
      cartItemsRemapped.push({
        productId: key,
        productTitle: state.cart.items[key].title,
        productPrice: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        productSum: state.cart.items[key].sum,
      });
    }
    return cartItemsRemapped;
  });
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button color={Base.accent} title="Order Now" onPress={() => {}} disabled={cartItems.length === 0} />
      </View>
      <View>
        <Text>CART ITEMS FLAT LIST</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  summaryText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 18,
  },
  amount: {
    color: Base.primary,
  },
});

export { CartScreen };
