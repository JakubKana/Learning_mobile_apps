import React from "react";
import { StyleSheet, FlatList } from "react-native";
import ListItem from "../ListItem/ListItem";

const placeList = props => {
    // Can have performance issues on slower devices use FlatList
    return (
      <FlatList
        style={styles.listContainer}
        data={props.places}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => (
         <ListItem
           // key={info.item.key.toString()}
            placeName={item.val}
            onItemPress={() => props.onItemDeleted(item.key)}
          />
        )}
      />
    );
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
  }
});

export default placeList;