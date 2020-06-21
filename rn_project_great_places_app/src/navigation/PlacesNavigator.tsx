import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { PlacesListScreen } from "../screens/PlacesListScreen";
import { PlaceDetailScreen } from "../screens/PlaceDetailScreen";
import { NewPlaceScreen } from "../screens/NewPlaceScreen";
import { MapScreen } from "../screens/MapScreen";
import { KEYS } from "./NavigationKeys";
import { Colors } from "../constants/colors";
import { isAndroid } from "../lib/platform";

const PlacesNavigator = createStackNavigator(
  {
    [KEYS.Places]: PlacesListScreen,
    [KEYS.PlaceDetail]: PlaceDetailScreen,
    [KEYS.NewPlace]: NewPlaceScreen,
    [KEYS.Map]: MapScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: isAndroid() ? Colors.primary : "",
      },
      headerTintColor: isAndroid() ? "white" : Colors.primary,
    },
  },
);

const AppNavigator = createAppContainer(PlacesNavigator);
export { AppNavigator };
