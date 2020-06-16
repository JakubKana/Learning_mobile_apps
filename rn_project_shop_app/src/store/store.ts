import { createStore, combineReducers, applyMiddleware } from "redux";
import { productsReducer } from "./reducers/products";
import { cartReducer } from "./reducers/cart";
import { ordersReducer } from "./reducers/orders";
import { composeWithDevTools } from "redux-devtools-extension";

import ReduxThunk from "redux-thunk";

const composeEnhancer = composeWithDevTools({ name: "Shop App" });

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(ReduxThunk)));

export { store };
