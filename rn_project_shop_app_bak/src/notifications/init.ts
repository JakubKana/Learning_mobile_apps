import AsyncStorage from "@react-native-community/async-storage";
import React, { Component } from "react";

import PushNotification from "react-native-push-notification";

export class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: token => {
        console.log("TOKEN:", token);
        AsyncStorage.setItem("pushToken", JSON.stringify(token));
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: notification => {
        console.log("NOTIFICATION:", notification);
        // process the notification here
        // required on iOS only
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
  render() {
    return null;
  }
}
