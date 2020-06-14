import React from "react";
import { FlatList, Text, Platform } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "./types";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { OrderItem } from "../../components/shop/OrderItem";

interface OrdersScreenProps {}

const OrdersScreen = (_props: OrdersScreenProps) => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items} />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData: { navigation: any }) => {
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

export { OrdersScreen };
