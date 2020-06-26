import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, Alert } from "react-native";
import MapView, { Marker, MapEvent } from "react-native-maps";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isAndroid } from "../lib/platform";
import { Colors } from "../constants/colors";
import { KEYS } from "../navigation/NavigationKeys";
import { Coords } from "../components/LocationPicker";

interface MapScreenProps {
  navigation: StackNavigationProp;
}

const MapScreen = (props: MapScreenProps) => {
  const initialLocation: Coords | undefined = props.navigation.getParam("intialLocation");
  const readonly = props.navigation.getParam("readonly");
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number }>();
  const mapRegion = {
    latitude: initialLocation?.lat ?? 37.78,
    longitude: initialLocation?.lng ?? -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapEvent) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({ lat: event.nativeEvent.coordinate.latitude, lng: event.nativeEvent.coordinate.longitude });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      Alert.alert("No location picked!", "Try picking location on map.", [{ text: "Okay" }]);
      return;
    }
    props.navigation.navigate(KEYS.NewPlace, { pickedLocation: selectedLocation });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
      {markerCoordinates && <Marker title="Picked location" coordinate={markerCoordinates} />}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData: { navigation: StackNavigationProp }) => {
  const saveFn = navData.navigation.getParam("saveLocation");
  const readonly = navData.navigation.getParam("readonly");

  if (readonly) {
    return {};
  }
  return {
    headerRight: () => {
      return (
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: isAndroid() ? "white" : Colors.primary,
  },
});

export { MapScreen };
