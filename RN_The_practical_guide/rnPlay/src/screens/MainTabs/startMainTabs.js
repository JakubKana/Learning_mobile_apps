import { Navigation } from "react-native-navigation";

const startTabs = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: "rnplay.FindPlaceScreen",
        options: {
          topBar: {
            title: "Find Place"
          }
        }
      }
    }
  });
};

export default startTabs;
