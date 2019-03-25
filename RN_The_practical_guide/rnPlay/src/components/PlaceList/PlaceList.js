import React, { PureComponent } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import ListItem from "../ListItem/ListItem";

type Props = {
  places: []
};

export default class PlaceList extends PureComponent<Props> {
  render() {
    const placesOutput = this.props.places.map((place, i) => (
      <ListItem
        key={i}
        placeName={place}
        onItemPress={() => this.props.onItemDeleted(i)}
        // onItemPress={() => alert("Item pressed ID: " + i)}
      />
    ));
    // Can have performance issues on slower devices use FlatList
    return <ScrollView style={styles.listContainer}>{placesOutput}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});
