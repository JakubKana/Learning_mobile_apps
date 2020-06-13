import React from "react";
import { View, Text, FlatList, Button, StyleSheet, ListRenderItemInfo } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./types";
import { Base } from "../../constants/Colors";
import { CartItem } from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

interface CartScreenProps {}

export type CartItem = {
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
  productSum: number;
};

const CartScreen = (_props: CartScreenProps) => {
  const cartTotalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const cartItems = useSelector((state: RootState) => {
    const cartItemsRemapped: CartItem[] = [];
    for (const key in state.cart.items) {
      cartItemsRemapped.push({
        productId: key,
        productTitle: state.cart.items[key].title,
        productPrice: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        productSum: state.cart.items[key].sum,
      });
    }
    return cartItemsRemapped.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });
  const dispatch = useDispatch();
  const renderCartItem = (itemData: ListRenderItemInfo<CartItem>) => {
    return (
      <CartItem
        quantity={itemData.item.quantity}
        title={itemData.item.productTitle}
        amount={itemData.item.productSum}
        onRemove={() => {
          dispatch(cartActions.removeFromCart(itemData.item.productId));
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Base.accent}
          title="Order Now"
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
          }}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList data={cartItems} keyExtractor={item => item.productId} renderItem={renderCartItem} />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
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
