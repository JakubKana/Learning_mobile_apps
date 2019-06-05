import { Navigation } from "react-native-navigation";
import {Provider} from "react-redux";


import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import PlaceDetail from "./src/screens/PlaceDetail/PlaceDetail";

import configureStore from "./src/store/configureStore";


const store = configureStore();

// Register Screens
Navigation.registerComponentWithRedux("rnplay.AuthScreen", () => AuthScreen, Provider, store);
Navigation.registerComponentWithRedux("rnplay.SharePlaceScreen", () => SharePlaceScreen, Provider, store);
Navigation.registerComponentWithRedux("rnplay.FindPlaceScreen", () => FindPlaceScreen, Provider, store);
Navigation.registerComponentWithRedux("rnplay.PlaceDetailScreen", () => PlaceDetail, Provider, store);
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
