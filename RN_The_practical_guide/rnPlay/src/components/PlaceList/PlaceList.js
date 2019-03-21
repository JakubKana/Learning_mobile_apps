import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
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
        onItemPress={() => alert("Item pressed ID: " + i)}
      />
    ));
    return <View style={styles.listContainer}>{placesOutput}</View>;
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});
