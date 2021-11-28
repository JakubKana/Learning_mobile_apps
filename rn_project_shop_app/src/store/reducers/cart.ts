import { CartState, ActionType } from "./types";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { Product } from "../../models/product";
import { CartItem } from "../../models/cart-Item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initState: CartState = {
  items: {},
  totalAmount: 0,
};

type CartActionType = ActionType & {
  product: Product;
  pid: string;
};

export function cartReducer(state: CartState = initState, action: CartActionType) {
  // eslint-disable-next-line eqeqeq
  if (action.type == ADD_TO_CART) {
    const addedProduct = action.product;
    const prodPrice = addedProduct.price;
    const prodTitle = addedProduct.title;
    const pushToken = addedProduct.ownerPushToken;

    let updatedOrNewCartItem: CartItem;
    if (state.items[addedProduct.id]) {
      // already in the cart
      updatedOrNewCartItem = new CartItem(
        state.items[addedProduct.id].quantity + 1,
        prodPrice,
        prodTitle,
        pushToken,
        state.items[addedProduct.id].sum + prodPrice,
      );
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    } else {
      updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, pushToken, prodPrice);
    }
    return {
      ...state,
      items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
      totalAmount: state.totalAmount + prodPrice,
    };
  }
  // eslint-disable-next-line eqeqeq
  if (action.type == REMOVE_FROM_CART) {
    const selectedCartItem = state.items[action.pid];
    const currentQuantity = selectedCartItem.quantity;
    let updatedCartItems;
    if (currentQuantity > 1) {
      // need to reduce it, not erase it
      const updatedCartItem = new CartItem(
        selectedCartItem.quantity - 1,
        selectedCartItem.price,
        selectedCartItem.title,
        selectedCartItem.pushToken,
        selectedCartItem.sum - selectedCartItem.price,
      );
      updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
    } else {
      updatedCartItems = { ...state.items };
      delete updatedCartItems[action.pid];
    }
    return {
      ...state,
      items: updatedCartItems,
      totalAmount: state.totalAmount - selectedCartItem.price,
    };
  }
  // eslint-disable-next-line eqeqeq
  if (action.type == ADD_ORDER) {
    return initState;
  }

  // eslint-disable-next-line eqeqeq
  if (action.type == DELETE_PRODUCT) {
    if (!state.items[action.pid]) {
      return state;
    }
    const updatedItems = { ...state.items };
    const itemTotal = state.items[action.pid].sum;
    delete updatedItems[action.pid];
    return {
      ...state,
      items: updatedItems,
      totalAmount: state.totalAmount - itemTotal,
    };
  }
  return state;
}
