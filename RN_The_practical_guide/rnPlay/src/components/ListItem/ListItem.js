import React from "react";

import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const listItem = props => (
  <TouchableOpacity onPress={props.onItemPress}>
    <View style={styles.listItem}>
      <Image source={props.placeImage} style={styles.placeImage} resizeMode="cover" />
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "#FDF"
  },
  placeImage: {
    marginRight: 8,
    height: 30,
    width: 30
  }
});

export default listItem;
