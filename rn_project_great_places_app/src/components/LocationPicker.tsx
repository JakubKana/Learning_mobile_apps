import React, { useState } from "react";
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import Location, { GeolocationResponse } from "@react-native-community/geolocation";
import * as Permissions from "react-native-permissions";
import { MapPreview } from "./MapPreview";

interface LocationPickerProps {}

const LocationPicker = (_props: LocationPickerProps) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [pickedLocation, setPickedLocation] = useState<null | { lat: number; lng: number }>();

  const verifyPermissions = async () => {
    const result = await Permissions.request(Permissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result !== "granted") {
      Alert.alert("Insufficient permissions!", "You need to grant location permissions to use this app", [
        { text: "Okay" },
      ]);
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      console.log("IS FETCHING MAP");
      setIsFetching(true);
      const locationPromise = new Promise<GeolocationResponse>((resolve, reject) => {
        Location.getCurrentPosition(
          (position: GeolocationResponse) => {
            resolve(position);
          },
          () => {
            reject();
          },
          { timeout: 5000 },
        );
      });
      const location = await locationPromise;
      console.log(location);
      setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
    } catch (error) {
      Alert.alert("Could not fetch location!", "Please try again later or pick a location on the map", [
        { text: "Okay" },
      ]);
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? <ActivityIndicator size="large" color={Colors.primary} /> : <Text>No location chosen yet!</Text>}
      </MapPreview>
      <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export { LocationPicker };
