import { Navigation } from "react-native-navigation";

import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";

// Register Screens
Navigation.registerComponent("rnplay.AuthScreen", () => AuthScreen);
Navigation.registerComponent("rnplay.SharePlaceScreen", () => SharePlaceScreen);
Navigation.registerComponent("rnplay.FindPlaceScreen", () => FindPlaceScreen);

// Start a App
Navigation.events().registerAppLaunchedListener(() => {
  
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "rnplay.AuthScreen",
            }
          }
        ],
        options: {
          topBar: {
            title: {
              text: 'Login'
            },
          }
        }
      }
    }
  });
});
