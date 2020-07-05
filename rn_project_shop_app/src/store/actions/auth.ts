import AsyncStorage from "@react-native-community/async-storage";
import { Dispatch } from "redux";

// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const USERDATA_KEY = "USERDATA_KEY";

let timer: any;

export type UserData = {
  token: string;
  userId: string;
  expirationDate: string;
};

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId: string, token: string, expirationTime: number) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(setLogoutTimer(expirationTime));
    dispatch({ type: AUTHENTICATE, userId, token });
  };
};
export const signup = (email: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhBck_aC6oQ86chRL-1LXDnBJMnBew_aQ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email is already registered!";
      }

      throw new Error(message);
    }
    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn, 10) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn, 10) * 1000).toISOString();
    saveDataToStorage({ token: resData.idToken, userId: resData.localId, expirationDate });
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhBck_aC6oQ86chRL-1LXDnBJMnBew_aQ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      }
      if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    console.log(resData);

    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn, 10) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn, 10) * 1000).toISOString();
    saveDataToStorage({ token: resData.idToken, userId: resData.localId, expirationDate });
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem(USERDATA_KEY);
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

/**
 * @param {expirationTime} number time in milliseconds
 * */
const setLogoutTimer = (expirationTime: number) => {
  return (dispatch: Dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (userData: UserData) => {
  AsyncStorage.setItem(USERDATA_KEY, JSON.stringify(userData));
};
