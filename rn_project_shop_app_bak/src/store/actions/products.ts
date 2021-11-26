import { Dispatch } from "redux";
import { Product } from "../../models/product";
import {
  check,
  checkNotifications,
  PERMISSIONS,
  request,
  requestNotifications,
  RESULTS,
} from "react-native-permissions";
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-community/async-storage";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export type ProductData = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  ownerId: string;
};

export const fetchProducts = () => {
  return async (dispatch: Dispatch, getState: any) => {
    const userId = getState().auth.userId;
    try {
      // add async code you want!
      // FETCH ANY KIND OF HTTP REQUEST
      const response = await fetch("https://rn-shop-app-21030.firebaseio.com/products.json");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
          ),
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId),
      });
    } catch (error) {
      //send to custom analytics server
      throw error;
    }
  };
};

export function deleteProduct(productId: string) {
  return async (dispatch: Dispatch, getState: any) => {
    const token = getState().auth.token;

    const response = await fetch(`https://rn-shop-app-21030.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
}

export const createProduct = (title: string, description: string, imageUrl: string, price: number) => {
  return async (dispatch: Dispatch, getState: any) => {
    let statusPremission;

    let pushToken;
    try {
      statusPremission = await checkNotifications();
      console.log(statusPremission);
      if (statusPremission.status !== RESULTS.GRANTED) {
        pushToken = null;
      } else {
        pushToken = await AsyncStorage.getItem("pushToken");
        console.log("pushTOken", pushToken);
      }
    } catch (err) {
      console.warn(err);
    }
    console.log("PushToken", pushToken);
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // add async code you want!
    // FETCH ANY KIND OF HTTP REQUEST
    const response = await fetch(`https://rn-shop-app-21030.firebaseio.com/products.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
        ownerPushToken: pushToken,
      }),
    });

    const resData = await response.json();
    console.dir(resData);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (id: string, title: string, description: string, imageUrl: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    const token = getState().auth.token;

    const response = await fetch(`https://rn-shop-app-21030.firebaseio.com/products/${id}.json?auth=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
