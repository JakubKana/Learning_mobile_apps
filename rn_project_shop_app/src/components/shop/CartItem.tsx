import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isAndroid } from "../../lib/platform";
import { Base } from "../../constants/Colors";

interface CartItemProps {
  onRemove: () => void;
  quantity: number;
  title: string;
  amount: number;
}

const CartItem = (props: CartItemProps) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons name={isAndroid() ? "md-trash" : "ios-trash"} size={23} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "OpenSans-Regular",
    color: Base.secondary,
    fontSize: 16,
  },
  mainText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export { CartItem };
