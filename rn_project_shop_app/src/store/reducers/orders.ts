import { OrdersState, ActionType } from "./types";
import { ADD_ORDER } from "../actions/orders";
import { Order } from "../../models/order";
import { CartItem } from "../../screens/shop/CartScreen";

const initState: OrdersState = {
  orders: [],
};

type OrdersActions = ActionType & {
  orderData: { items: Array<CartItem>; amount: number };
};

export function ordersReducer(state: OrdersState = initState, action: OrdersActions) {
   // eslint-disable-next-line eqeqeq
  if (action.type == ADD_ORDER) {
    const newOrder = new Order(new Date().toString(), action.orderData.items, action.orderData.amount, new Date());
    return {
      ...state,
      orders: state.orders.concat(newOrder),
    };
  }

  return state;
}
