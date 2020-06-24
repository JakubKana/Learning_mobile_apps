import React from "react";

import { AppNavigator } from "./src/navigation/PlacesNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { init } from "./src/helpers/db";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch(error => {
    console.log("Initializing db failed.");
    console.error(error);
  });

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export { App };
