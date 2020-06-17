import { Dispatch } from "redux";

export const SIGNUP = "SIGNUP";

export const signup = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
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
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();
    console.log(resData);

    dispatch({ type: SIGNUP });
  };
};
