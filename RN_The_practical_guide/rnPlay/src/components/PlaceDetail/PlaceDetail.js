import React from "react";
import { Modal, View, Image, Text, Button, StyleSheet } from "react-native";

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
    <Modal visible={props.selectedPlace !== null} animationType="slide">
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <Button title="Delete" color="red" onPress={props.onItemDeleted}/>
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
    }
    
});

export default PlaceDetail;
