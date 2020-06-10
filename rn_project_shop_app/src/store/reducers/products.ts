import { PRODUCTS } from "../../data/mock-data";
import { ProductState, ProductsState } from "./types";

const initState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(p => p.ownerId === "u1"),
};

export function productsReducer(state: ProductState = initState, _action: any): ProductState {
  return state;
}
