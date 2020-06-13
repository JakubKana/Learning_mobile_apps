import { Product } from "../../models/product";
import { CartItem } from "../../models/cart-Item";
import { Order } from "../../models/order";

export type ActionType = { type: string; [payload: string]: any };

export type ProductState = {
  availableProducts: Array<Product>;
  userProducts: Array<Product>;
};

export type CartState = { items: { [name: string]: CartItem }; totalAmount: number };

export type ProductsState = { availableProducts: Array<Product>; userProducts: Array<Product> };

export type OrdersState = { orders: Array<Order> };
