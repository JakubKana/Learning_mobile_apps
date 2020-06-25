import React, { ReactNode } from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";
import { ENV } from "../../env";

interface MapPreviewProps {
  location?: { lat: number; lng: number } | null;
  children: ReactNode;
  style: ViewStyle;
}

const MapPreview = (props: MapPreviewProps) => {
  let imagePreviewUrl;
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?ceter=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }
  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} /> : props.children}
    </View>
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
