import { CartItem } from "../../screens/shop/CartScreen";

export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems: Array<CartItem>, totalAmount: number) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount },
  };
};
