import { Product } from "../../models/product";
import { ActionType } from "../reducers/types";

export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (product: Product): ActionType => {
  return { type: ADD_TO_CART, product: product };
};
