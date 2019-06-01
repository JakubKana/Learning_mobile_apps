import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";

const startTabs = () => {
  Promise.all([
    Icon.getImageSource('place-of-worship', 32, 'black'),
    Icon.getImageSource('gopuram',32, 'black')
]).then(([
    SharedPlaceIcon,
    FindPlaceIcon]) => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: "BottomTabs",
        children: [
          {
            stack: {
              id: "TAB1_ID",
              children: [
                {
                  component: {
                    name: "rnplay.SharePlaceScreen",
                    options: {
                      topBar: {
                        visible: true,
                        title: {
                          text: "Share Place"
                        }
                      },
                      bottomTab: {
                        text: "Share Place",
                        icon: SharedPlaceIcon,
                        textColor: "#1B4C77",
                        selectedTextColor: "#444",
                        selectedIconColor: "#555",
                        fontSize: 14,
                        selectedFontSize: 16
                      }
                    }
                  }
                }
              ],
              options: {
                topBar: {
                  visible: false
                }
              }
            }
          },
          {
            stack: {
              id: "TAB2_ID",
              children: [
                {
                  component: {
                    name: "rnplay.FindPlaceScreen",
                    options: {
                      topBar: {
                        visible: true,
                        title: {
                          text: "Find Place"
                        }
                      },
                      bottomTab: {
                        text: "Find Place",
                        icon: FindPlaceIcon,
                        textColor: "#1B4C77",
                        selectedTextColor: "#444",
                        selectedIconColor: "#555",
                        fontSize: 14,
                        selectedFontSize: 16
                      }
                    }
                  }
                }
              ],
              options: {
                topBar: {
                  visible: false
                }
              }
            }
          }
        ],
        options: {
          bottomTabs: {
            titleDisplayMode: "alwaysShow",
            testID: "BOTTOM_TABS_ELEMENT"
          }
        }
      }
    }
  });
  });
};


export default startTabs;
