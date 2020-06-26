import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Button, ScrollView, TextInput, Alert } from "react-native";
import { Colors } from "../constants/colors";
import * as placesActions from "../store/actions/places";
import { useDispatch } from "react-redux";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { ImgPicker } from "../components/ImgPicker";
import { LocationPicker, Coords } from "../components/LocationPicker";

interface NewPlaceScreenProps {
  navigation: StackNavigationProp;
}

const NewPlaceScreen = (props: NewPlaceScreenProps) => {
  const [titleValue, setTitleValue] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<Coords>();

  const dispatch = useDispatch();

  const titleChangeHandler = (text: string) => {
    // add validation
    setTitleValue(text);
  };

  const locationPickedHandler = useCallback((location: Coords) => {
    setSelectedLocation(location);
  }, []);

  const imageTakenHandler = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    if (!selectedLocation) {
      Alert.alert("Location is not selected!", "Please select location!", [{ text: "Okay" }]);
      return;
    }
    dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />
        <ImgPicker onImageTake={imageTakenHandler} />
        <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
        <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export { NewPlaceScreen };
