import React, { PureComponent } from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";

type Props = {};

class TextInputForm extends PureComponent<Props> {
  state = {
    placeName: "",
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  placeSubmitHandler = () => {
    if(this.state.placeName.trim().length === 0) {
      return;
    }

    this.props.onPlaceAdded(this.state.placeName);
   
  }
r
  render() {
    return (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.placeInput}
      placeholder="An awesome place"
      onChangeText={this.placeNameChangedHandler}
      value={this.state.placeName}
    />
    <Button
      title="Add"
      style={styles.placeButton}
      onPress={this.placeSubmitHandler}
    />
  </View>
  );
}
}
  

const styles = StyleSheet.create({
  inputContainer: {
    //flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  }
});

export default TextInputForm;
