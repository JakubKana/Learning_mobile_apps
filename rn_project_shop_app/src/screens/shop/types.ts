import { ProductState, CartState, OrdersState, AuthState } from "../../store/reducers/types";

export type RootState = { products: ProductState; cart: CartState; orders: OrdersState; auth: AuthState };

export type RootStackParamList = {
  Shop: undefined;
  Auth: undefined;
  Startup: undefined;
};
