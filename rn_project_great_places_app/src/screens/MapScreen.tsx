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
  const initialLocation: any = props.navigation.getParam("initialLocation");
  const readonly = props.navigation.getParam("readonly");
  const [selectedLocation, setSelectedLocation] = useState<null | { lat: number; lng: number }>(null);
  console.log("INIT LOCATION", initialLocation);

  const getRegionFromCoordinates = (points: Coords[]) => {
    let minX: number;
    let maxX: number;
    let minY: number;
    let maxY: number;
    ((point: Coords) => {
      minX = point.lat;
      maxX = point.lat;
      minY = point.lng;
      maxY = point.lng;
    })(points[0]);

    points.map(point => {
      minX = Math.min(minX, point.lat);
      maxX = Math.max(maxX, point.lat);
      minY = Math.min(minY, point.lng);
      maxY = Math.max(maxY, point.lng);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = maxX - minX + 0.0009;
    const deltaY = maxY - minY + 0.0009;

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY,
    };
  };

  const mapRegion =
    initialLocation && getRegionFromCoordinates([{ lat: initialLocation.lat, lng: initialLocation.lng }]);

  const selectLocationHandler = (event: MapEvent) => {
    console.log("SelectLocationHandler", readonly, event.nativeEvent.coordinate);
    if (readonly) {
      return;
    }
    setSelectedLocation({ lat: event.nativeEvent.coordinate.latitude, lng: event.nativeEvent.coordinate.longitude });
  };

  const savePickedLocationHandler = useCallback(() => {
    console.log("SavePickedLocationHandler", selectedLocation);
    if (!selectedLocation) {
      // could show an alert!
      Alert.alert("No location picked!", "Try picking location on map.", [{ text: "Okay" }]);
      return;
    }
    props.navigation.navigate(KEYS.NewPlace, { pickedLocation: selectedLocation });
  }, [selectedLocation]);

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
