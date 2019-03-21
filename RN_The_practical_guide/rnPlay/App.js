/**
 * The React Native The Practical Guide App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button
} from "react-native";

import ListItem from "./src/components/ListItem/ListItem"

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

export default class App extends Component<Props> {
  state = {
    placeName: "",
    places: [],
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
    this.setState(prevState=> {
      return {
        places: prevState.places.concat(prevState.placeName),
      }
    })
  }

  render() {
    const placesOutput = this.state.places.map((place, i) => (
      <ListItem key={i} placeName={place}/>
    ));
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.placeInput}
            placeholder="An awesome place"
            onChangeText={this.placeNameChangedHandler}
            value={this.state.placeName}
          />
          <Button title="Add" style={styles.placeButton} onPress={this.placeSubmitHandler}  />
          </View>
          <View style={styles.listContainer}>
            {placesOutput}
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
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
  },
  listContainer: {
    width:"100%"
  }
});
