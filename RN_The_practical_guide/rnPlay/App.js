import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import PlaceList from "./src/components/PlaceList/PlaceList";
import TextInputForm from "./src/components/TextInputForm/TextInputForm";
import placeImage from "./src/assets/beautiful-place.jpg";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";

type Props = {};

export default class App extends Component<Props> {
  state = {
    places: [],
    selectedPlace: null,
  };

  placeAddedHandler = placeName => {
     // Set state runs asynchronously
    this.setState(prevProps => {
      return {
        places: prevProps.places.concat({
          key: Math.random(), 
          name: placeName,
          imageLocal: placeImage,
          image: {
            uri: "https://images2.alphacoders.com/141/thumb-1920-141340.jpg"
          }
        }),
      };
    });
  };

  placeDeletedHandler = key => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== key;
        })
      };
    });
  };

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail selectedPlace={this.state.selectedPlace}/>
        <TextInputForm onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler}
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
  }
});
