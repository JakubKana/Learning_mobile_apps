import React from "react";
import { useReducer, useCallback, useState, useEffect } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Button, View, ActivityIndicator, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Input } from "../../components/UI/Input";
import { Card } from "../../components/UI/Card";
import { Base } from "../../constants/Colors";

import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { ActionType } from "../../store/reducers/types";

import { StackNavigationProp } from "@react-navigation/stack";
import { AuthNavigatorStackParamList } from "../shop/types";

type AuthStackNavigationProp = StackNavigationProp<AuthNavigatorStackParamList, "Auth">;

interface AuthScreenProps {
  nav: AuthStackNavigationProp;
}

type InputValidities = { [name: string]: boolean };
type InputValues = { email: string; password: string };

interface FormReducerState {
  inputValues: InputValues;
  inputValidities: InputValidities;
  formIsValid: Object;
}

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state: FormReducerState, action: ActionType): FormReducerState => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities: InputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const AuthScreen = (_props: AuthScreenProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action: null | any = null;
    if (isSignup) {
      action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
    } else {
      action = authActions.login(formState.inputValues.email, formState.inputValues.password);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      // props.navigation.navigate(KEYS.Shop);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screens}>
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChanged={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChanged={inputChangeHandler}
            />
            <View style={styles.buttonContainer}>
              {isLoading === true ? (
                <ActivityIndicator size="small" color={Base.primary} />
              ) : (
                <Button title={isSignup ? "Sign Up" : "Login"} color={Base.primary} onPress={authHandler} />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Base.accentDarker}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screens: {
    flex: 1,
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },

  buttonContainer: {
    marginTop: 10,
  },
});

export { AuthScreen };
