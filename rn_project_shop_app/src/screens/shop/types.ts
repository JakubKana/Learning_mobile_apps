import { ProductState, CartState, OrdersState } from "../../store/reducers/types";

export type RootState = { products: ProductState; cart: CartState; orders: OrdersState };
