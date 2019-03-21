import React from "react";

import { View, Text, StyleSheet,TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback } from "react-native";

const listItem = props => (
  <TouchableOpacity onPress={props.onItemPress}>
    <View style={styles.listItem}>
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "#FDF"
  }
});

export default listItem;
