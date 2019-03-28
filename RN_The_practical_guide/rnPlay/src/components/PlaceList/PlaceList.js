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
           placeImage={Math.random() >= 0.5 ? item.image : item.imageLocal} 
           placeName={item.name}
            onItemPress={() => props.onItemSelected(item.key)}
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