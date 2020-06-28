import React, { useState, useEffect } from "react";
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import Location, { GeolocationResponse } from "@react-native-community/geolocation";
import * as Permissions from "react-native-permissions";
import { MapPreview } from "./MapPreview";
import { KEYS } from "../navigation/NavigationKeys";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";

export type Coords = {
  lat: number;
  lng: number;
};

interface LocationPickerProps {
  navigation: StackNavigationProp;
  onLocationPicked: (coords: Coords) => void;
}

const LocationPicker = (props: LocationPickerProps) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [pickedLocation, setPickedLocation] = useState<null | { lat: number; lng: number }>();

  const mapPickedLocation = props.navigation.getParam("pickedLocation");

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
    }
  }, [mapPickedLocation]);

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
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Could not fetch location!", "Please try again later or pick a location on the map", [
        { text: "Okay" },
      ]);
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate(KEYS.Map);
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
        {isFetching ? <ActivityIndicator size="large" color={Colors.primary} /> : <Text>No location chosen yet!</Text>}
      </MapPreview>
      <View>
        <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
        <Button title="Pick on Map" color={Colors.primary} onPress={pickOnMapHandler} />
      </View>
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export { LocationPicker };
