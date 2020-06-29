import React, { Component } from "react";

import { AppNavigator } from "./src/navigation/PlacesNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { init } from "./src/helpers/db";
import SplashScreen from "react-native-splash-screen";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch(error => {
    console.log("Initializing db failed.");
    console.error(error);
  });

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export { App };
