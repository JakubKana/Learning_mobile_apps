import { Product } from "../../models/product";
import { CartItem } from "../../models/cart-Item";

export type ActionType = { type: string; [payload: string]: any };

export type ProductState = {
  availableProducts: Array<Product>;
  userProducts: Array<Product>;
};

export type CartState = { items: { [name: string]: CartItem }; totalAmount: number };

export type ProductsState = { availableProducts: Array<Product>; userProducts: Array<Product> };
