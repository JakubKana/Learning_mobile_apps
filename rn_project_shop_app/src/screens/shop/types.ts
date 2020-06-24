import { ProductState, CartState, OrdersState, AuthState } from "../../store/reducers/types";

export type RootState = { products: ProductState; cart: CartState; orders: OrdersState; auth: AuthState };
