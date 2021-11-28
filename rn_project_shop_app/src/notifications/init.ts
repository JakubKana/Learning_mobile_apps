import AsyncStorage from "@react-native-community/async-storage";
import { Alert, PushNotificationIOS } from "react-native";
import PushNotification, { ReceivedNotification } from "react-native-push-notification";

export class PushNotificationController {
  static init() {
    console.log("init");
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
        AsyncStorage.setItem("pushToken", token.token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: async function (notification: Omit<ReceivedNotification, "userInfo">) {
        console.log("NOTIFICATION:", notification);

        // process the notification

        PushNotification.localNotificationSchedule({
          message: notification?.message as string,
          date: new Date(),
          repeatTime: 1,
        });

        Alert.alert("Notification arrived!", notification?.message as string, [
          { onPress: () => console.log("Cancel"), style: "cancel", text: "Cancel" },
        ]);

        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number)
      // (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "130399066880",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }
}
