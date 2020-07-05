import { ProductState, CartState, OrdersState, AuthState } from "../../store/reducers/types";

export type RootState = { products: ProductState; cart: CartState; orders: OrdersState; auth: AuthState };

export type ProductsNavigatorStackParamList = {
  ProductDetail: { productId: string; productTitle: string };
  ProductsOverview: undefined;
  Cart: undefined;
};

export type OrdersNavigatorStackParamList = {
  Orders: undefined;
};

export type AdminNavigatorStackParamList = {
  UserProducts: undefined;
  EditProduct: { productId: string };
};

export type AuthNavigatorStackParamList = {
  Auth: undefined;
};

export type ShopNavigatorDrawerParamList = {
  Products: undefined;
  Orders: undefined;
  Admin: undefined;
};
