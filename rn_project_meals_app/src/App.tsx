import React from "react";
import { StyleSheet } from "react-native";

import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { MealsNavigatorContainer } from "./navigation/MealsNavigator";
import { composeWithDevTools } from "redux-devtools-extension";
import { mealsReducer, State } from "./store/reducers/meals";

export type RootState = {
  meals: State;
};

enableScreens(true);

const rootReducers = combineReducers({
  meals: mealsReducer,
});

let store = createStore(rootReducers);
if (__DEV__ === true) {
  store = createStore(rootReducers, composeWithDevTools());
}

const App: () => JSX.Element = () => {
  return (
    <Provider store={store}>
      <MealsNavigatorContainer />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export { App };
