import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, TextInput } from "react-native";
import { Colors } from "../constants/colors";

const NewPlaceScreen = () => {
  const [titleValue, setTitleValue] = useState("");

  const titleChangeHandler = (text: string) => {
    // add validation
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />
        <Button title="Save Place" color={Colors.primary} onPress={() => {}} />
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
