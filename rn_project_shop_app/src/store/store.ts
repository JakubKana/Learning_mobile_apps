import { createStore, combineReducers } from "redux";
import { productsReducer } from "./reducers/products";
import { cartReducer } from "./reducers/cart";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, devToolsEnhancer({ name: "Shop App" }));

export { store };
