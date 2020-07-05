import React, { useEffect, useState, useCallback } from "react";
import { FlatList, View, StyleSheet, Text, Platform, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./types";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { OrderItem } from "../../components/shop/OrderItem";
import * as orderActions from "../../store/actions/orders";
import { Base } from "../../constants/Colors";

interface OrdersScreenProps {}

const OrdersScreen = (_props: OrdersScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(orderActions.fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
      </View>
    );
  }

  if (isLoading) {
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Base.primary} />
    </View>;
  }

  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No order found, maybe start ordering some products?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          key={itemData.item.id}
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export const screenOptions = (navData: { navigation: any }) => {
  return {
    headerTitle: "Your orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { OrdersScreen };
