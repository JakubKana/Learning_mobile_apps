import { ActionType, AuthState } from "./types";
import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initState: AuthState = {
  token: null,
  userId: null,
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
    };
  }
  // eslint-disable-next-line eqeqeq
  if (action.type == LOGOUT) {
    return initState;
  }
  //   if (action.type == SIGNUP) {
  //     return {
  //       token: action.token,
  //       userId: action.userId,
  //     };
  //   }
  return state;
}
