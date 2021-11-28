import { ProductState, ProductsState, ActionType } from "./types";
import { DELETE_PRODUCT, CREATE_PRODUCT, ProductData, UPDATE_PRODUCT, SET_PRODUCTS } from "../actions/products";
import { Product } from "../../models/product";

type ProductsActions = ActionType & {
  pid: string;
  productData: ProductData;
  products: Product[];
};

const initState: ProductsState = {
  availableProducts: [],
  userProducts: [],
};

export function productsReducer(state: ProductState = initState, action: ProductsActions): ProductState {
  // eslint-disable-next-line eqeqeq
  if (action.type == DELETE_PRODUCT) {
    return {
      ...state,
      userProducts: state.userProducts.filter(prod => prod.id !== action.pid),
      availableProducts: state.availableProducts.filter(prod => prod.id !== action.pid),
    };
  }
  // eslint-disable-next-line eqeqeq
  if (action.type == SET_PRODUCTS) {
    return {
      availableProducts: action.products,
      userProducts: action.userProducts,
    };
  }

  // eslint-disable-next-line eqeqeq
  if (action.type == CREATE_PRODUCT) {
    const newProduct = new Product(
      action.productData.id,
      action.productData.ownerId,
      action.productData.ownerPushToken,
      action.productData.title,
      action.productData.imageUrl,
      action.productData.description,
      action.productData.price,
    );
    return {
      ...state,
      availableProducts: state.availableProducts.concat(newProduct),
      userProducts: state.userProducts.concat(newProduct),
    };
  }
  // eslint-disable-next-line eqeqeq
  if (action.type == UPDATE_PRODUCT) {
    const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
    const updatedProduct = new Product(
      action.pid,
      state.userProducts[productIndex].ownerId,
      state.userProducts[productIndex].ownerPushToken,
      action.productData.title,
      action.productData.imageUrl,
      action.productData.description,
      state.userProducts[productIndex].price,
    );
    const updatedUserProducts = [...state.userProducts];
    updatedUserProducts[productIndex] = updatedProduct;
    const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
    const updatedAvailableProducts = [...state.availableProducts];
    updatedAvailableProducts[availableProductIndex] = updatedProduct;
    return { ...state, availableProducts: updatedAvailableProducts, userProducts: updatedUserProducts };
  }

  return state;
}
