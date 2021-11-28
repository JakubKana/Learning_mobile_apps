import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { PushNotificationController } from "./src/notifications/init";

PushNotificationController.init();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export { App };
