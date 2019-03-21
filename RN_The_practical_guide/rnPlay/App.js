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
import replacePathSepForGlob from "jest-util/build/replacePathSepForGlob";
import { black } from "ansi-colors";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

export default class App extends Component<Props> {
  state = {
    placeName: ""
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={style.inputContainer}>
          <Text>Awesome</Text>
          <TextInput
            maxLength={40}
            placeholder="An awesome place"
            style={{ width: 200, borderColor: "black", borderWidth: 1 }}
            onChangeText={this.placeNameChangedHandler}
            value={this.state.placeName}
          />
          <Button title="Add" />
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
