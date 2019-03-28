import React from "react";
import { Modal, View, Image, Text, Button, StyleSheet } from "react-native";

const PlaceDetail = props => {
  let modalContent = null;

  if (props.selectedPlace) {
    modalContent = (
      <>
        <Image source={props.selectedPlace.image} />
        <Text>{props.selectedPlace.name}</Text>
      </>
    );
  }
  return (
    <Modal visible={props.selectedPlace !== null} animationType="slide">
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <Button title="Delete" color="red"/>
          <Button title="Close" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        margin: 22
    },
    placeImage: {
        width: "100%",
        height: 200,
    }
    
});

export default PlaceDetail;
