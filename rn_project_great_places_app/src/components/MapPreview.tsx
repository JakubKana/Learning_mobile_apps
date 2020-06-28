import React, { ReactNode } from "react";
import { TouchableOpacity, Image, StyleSheet, ViewStyle } from "react-native";
import { ENV } from "../../env";

interface MapPreviewProps {
  location?: { lat: number; lng: number } | null;
  children?: ReactNode;
  style: ViewStyle;
  onPress: () => void;
}

const MapPreview = (props: MapPreviewProps) => {
  let imagePreviewUrl;
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?ceter=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }
  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} /> : props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export { MapPreview };
