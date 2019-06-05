import React, {Component } from "react";
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {connect} from 'react-redux';
import { deletePlace } from '../../store/actions/index';
import { Navigation } from "react-native-navigation";

class PlaceDetail extends Component {

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop(this.props.componentId);
  }

  render(){
    return (
        <View style={styles.modalContainer}>
          <View>
          <Image style={styles.placeImage} source={this.props.selectedPlace.image} />
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>
          <View>
            <TouchableOpacity style={styles.deleteButton} onPress={this.placeDeletedHandler}>
                <Icon size={30} name="trash" color="red"/>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
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

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  }
}

export default connect(null, mapDispatchToProps)(PlaceDetail);