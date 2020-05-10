import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: "darkblue",

    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  resultContainer: {
    width: "80%",
    marginHorizontal: 30,
  },
  resultText: {
    textAlign: "center",
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "OpenSans-Bold",
  },
});
