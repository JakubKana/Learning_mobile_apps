import React from "react";
import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";

import { MapPreview } from "../components/MapPreview";
import { useSelector } from "react-redux";
import { RootState } from "../store/types";
import { Colors } from "../constants/colors";
import { KEYS } from "../navigation/NavigationKeys";
import { Coords } from "../components/LocationPicker";

interface PlaceDetailScreenProps {
  navigation: StackNavigationProp;
}

const PlaceDetailScreen = (props: PlaceDetailScreenProps) => {
  const placeId = props.navigation.getParam("placeId");
  const selectedPlace = useSelector((state: RootState) => state.places.places.find(place => place.id === placeId));


  const selectedLocation: any = selectedPlace && { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const showMapHandler = () => {
    console.log("Show map handler");
    console.log("initialLocation", selectedLocation);
    props.navigation.navigate(KEYS.Map, { readonly: true, initialLocation: selectedLocation });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace?.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace?.address}</Text>
        </View>
        {selectedLocation ? (
          <MapPreview style={styles.mapPreview} location={selectedLocation} onPress={showMapHandler} />
        ) : (
          <Text>Selected place not found!</Text>
        )}
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navData: { navigation: StackNavigationProp }) => {
  return { headerTitle: navData.navigation.getParam("placeTitle") };
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export { PlaceDetailScreen };
