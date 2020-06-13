import { createStore, combineReducers } from "redux";
import { productsReducer } from "./reducers/products";
import { cartReducer } from "./reducers/cart";
import { ordersReducer } from "./reducers/orders";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer, devToolsEnhancer({ name: "Shop App" }));

export { store };
