import { Navigation } from "react-native-navigation";

import icon from "../../assets/beautiful-place.jpg";
const startTabs = () => {
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
                        icon: icon,
                        textColor: "#1B4C77",
                        selectedTextColor: "#0f0",
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
                        icon: icon,
                        textColor: "#1B4C77",
                        selectedTextColor: "#0f0",
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
};

export default startTabs;
