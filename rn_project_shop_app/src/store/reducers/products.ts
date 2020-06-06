import { PRODUCTS } from "../../data/mock-data";
import { State } from "./types";

const initState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(p => p.ownerId === "u1"),
};

export function productsReducer(state: State = initState, _action: any): State {
  return state;
}
