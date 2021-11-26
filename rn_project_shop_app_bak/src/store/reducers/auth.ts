import { ActionType, AuthState } from "./types";
import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from "../actions/auth";

const initState: AuthState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

type AuthActionType = ActionType & {
  token: string;
  userId: string;
};

export function authReducer(state: AuthState = initState, action: AuthActionType) {
  // eslint-disable-next-line eqeqeq
  if (action.type == AUTHENTICATE) {
    return {
      token: action.token,
      userId: action.userId,
      didTryAutoLogin: true,
    };
  }
  // eslint-disable-next-line eqeqeq
  if (action.type == SET_DID_TRY_AL) {
    return {
      ...state,
      didTryAutoLogin: true,
    };
  }
  // eslint-disable-next-line eqeqeq
  if (action.type == LOGOUT) {
    return { ...initState, didTryAutoLogin: true };
  }
  //   if (action.type == SIGNUP) {
  //     return {
  //       token: action.token,
  //       userId: action.userId,
  //     };
  //   }
  return state;
}
