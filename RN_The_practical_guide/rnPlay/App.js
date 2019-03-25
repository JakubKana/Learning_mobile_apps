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
  View,
} from "react-native";

import PlaceList from "./src/components/PlaceList/PlaceList";
import TextInputForm from "./src/components/TextInputForm/TextInputForm";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

export default class App extends Component<Props> {
  
  state = {
    places: [],
  };

  
  placeAddedHandler = placeName => {
      // Set state runs asynchronously
      this.setState(prevState => {
      return {
        places: prevState.places.concat(placeName),
      }
    })
  }

  placeDeletedHandler = index => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter((place, i) => {
          return i !== index;
        })
      };
    });
  }


  render() {
 
    return (
      <View style={styles.container}>
          <TextInputForm
              onPlaceAdded={this.placeAddedHandler}
          />
        <PlaceList places={this.state.places}
          onItemDeleted={this.placeDeletedHandler}
        />
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
});
