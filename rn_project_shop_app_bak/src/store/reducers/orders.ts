import { OrdersState, ActionType } from "./types";
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
import { Order } from "../../models/order";
import { CartItem } from "../../screens/shop/CartScreen";

const initState: OrdersState = {
  orders: [],
};

type OrdersActions = ActionType & {
  orders: Array<Order>;
  orderData: { id: string; items: Array<CartItem>; amount: number; date: Date };
};

export function ordersReducer(state: OrdersState = initState, action: OrdersActions) {
  // eslint-disable-next-line eqeqeq
  if (action.type == SET_ORDERS) {
    return { orders: action.orders };
  }

  // eslint-disable-next-line eqeqeq
  if (action.type == ADD_ORDER) {
    const newOrder = new Order(
      action.orderData.id,
      action.orderData.items,
      action.orderData.amount,
      action.orderData.date,
    );
    return {
      ...state,
      orders: state.orders.concat(newOrder),
    };
  }

  return state;
}
