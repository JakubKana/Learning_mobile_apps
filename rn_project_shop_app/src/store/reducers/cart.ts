import { CartState, ActionType } from "./types";
import { ADD_TO_CART } from "../actions/cart";
import { Product } from "../../models/product";
import { CartItem } from "../../models/cart-Item";

const initState: CartState = {
  items: {},
  totalAmount: 0,
};

type CartActionType = ActionType & {
  product: Product;
};

export function cartReducer(state: CartState = initState, action: CartActionType) {
  // eslint-disable-next-line eqeqeq
  if (action.type == ADD_TO_CART) {
    const addedProduct = action.product;
    const prodPrice = addedProduct.price;
    const prodTitle = addedProduct.title;
    let updatedOrNewCartItem: CartItem;
    if (state.items[addedProduct.id]) {
      // already in the cart
      updatedOrNewCartItem = new CartItem(
        state.items[addedProduct.id].quantity + 1,
        prodPrice,
        prodTitle,
        state.items[addedProduct.id].sum + prodPrice,
      );
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem, totalAmount: state.totalAmount + prodPrice },
      };
    } else {
      updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
    }
    return {
      ...state,
      items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
      totalAmount: state.totalAmount + prodPrice,
    };
  }

  return state;
}
