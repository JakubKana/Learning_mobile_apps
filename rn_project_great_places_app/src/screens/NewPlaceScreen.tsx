import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, TextInput } from "react-native";
import { Colors } from "../constants/colors";
import * as placesActions from "../store/actions/places";
import { useDispatch } from "react-redux";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { ImgPicker } from "../components/ImageSelector";

interface NewPlaceScreenProps {
  navigation: StackNavigationProp;
}

const NewPlaceScreen = (props: NewPlaceScreenProps) => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const dispatch = useDispatch();

  const titleChangeHandler = (text: string) => {
    // add validation
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />
        <ImgPicker onImageTake={imageTakenHandler} />
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
