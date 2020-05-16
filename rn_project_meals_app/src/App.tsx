import React from "react";
import { StyleSheet } from "react-native";

import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { MealsNavigatorContainer } from "./navigation/MealsNavigator";

import { mealsReducer, State } from "./store/reducers/meals";

export type RootState = {
  meals: State;
};

enableScreens(true);

const rootReducers = combineReducers({
  meals: mealsReducer,
});
const store = createStore(rootReducers);

const App: () => JSX.Element = () => {
  return (
    <Provider store={store}>
      <MealsNavigatorContainer />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export { App };
