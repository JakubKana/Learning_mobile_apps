import { Dimensions } from "react-native";

export function isPortrait(): boolean {
  const dimension = Dimensions.get("window");
  return dimension.height >= dimension.width;
}

export function isLandscape(): boolean {
  const dimension = Dimensions.get("window");
  return dimension.width >= dimension.height;
}
