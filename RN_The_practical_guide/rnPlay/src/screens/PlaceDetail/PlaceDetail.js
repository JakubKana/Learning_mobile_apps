import React from "react";
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";



const PlaceDetail = props => {
  return (
      <View style={styles.modalContainer}>
         <View>
        <Image style={styles.placeImage} source={props.selectedPlace.image} />
        <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
      </View>
        <View>
          <TouchableOpacity style={styles.deleteButton} onPress={props.onItemDeleted}>
              <Icon size={30} name="trash" color="red"/>
          </TouchableOpacity>

        </View>
      </View>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        margin: 22
    },
    placeName: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 28
    },
    placeImage: {
        width: "100%",
        height: 200,
    },
    deleteButton: {
      alignItems: "center"
    }
    
});

export default PlaceDetail;
