import React, { useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, ListRenderItemInfo, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./types";
import { Base } from "../../constants/Colors";
import { CartItem } from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";
import { Card } from "../../components/UI/Card";

interface CartScreenProps {}

export type CartItem = {
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
  productSum: number;
};

const CartScreen = (_props: CartScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  const renderCartItem = (itemData: ListRenderItemInfo<CartItem>) => {
    return (
      <CartItem
        deletable
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
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(parseFloat(cartTotalAmount.toFixed(2)) * 100) / 100}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Base.primary} />
        ) : (
          <Button
            color={Base.accentDarker}
            title="Order Now"
            onPress={sendOrderHandler}
            disabled={cartItems.length === 0}
          />
        )}
      </Card>
      <FlatList data={cartItems} keyExtractor={item => item.productId} renderItem={renderCartItem} />
    </View>
  );
};

export const screenOptions = {
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
