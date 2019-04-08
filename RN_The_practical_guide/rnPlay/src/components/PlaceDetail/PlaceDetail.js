import React from "react";
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";



const PlaceDetail = props => {
  let modalContent = null;

  if (props.selectedPlace) {
    modalContent = (
      <>
        <Image style={styles.placeImage} source={props.selectedPlace.image} />
        <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
      </>
    );
  }
  return (
    <Modal onRequestClose={props.onModalClosed} visible={props.selectedPlace !== null} animationType="slide">
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <TouchableOpacity style={styles.deleteButton} onPress={props.onItemDeleted}>
              <Icon size={30} name="trash" color="red"/>
          </TouchableOpacity>
          <Button title="Close" onPress={props.onModalClosed}/>
        </View>
      </View>
    </Modal>
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
