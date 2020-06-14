import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Base } from "../../constants/Colors";
import { CartItem } from "./CartItem";
import { CartItem as CartItemType } from "../../screens/shop/CartScreen";
import { Card } from "../UI/Card";

interface OrderItemProps {
  amount: number;
  date: string;
  items: CartItemType[];
}

const OrderItem = (props: OrderItemProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Base.primary}
        title={showDetails ? "Hide Details " : "Show Details"}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem: CartItemType) => (
            <CartItem
              deletable={false}
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.productSum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "OpenSans-Bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    color: Base.secondary,
  },
  detailItems: {
    width: "100%",
  },
});

export { OrderItem };
