import React, { Component } from "react";
import { View, Text } from "react-native";
import {connect} from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
import {Navigation} from 'react-native-navigation';


class FindPlaceScreen extends Component {
 itemSelectHandler = key => {
   const selectPlace =  this.props.places.find(place => {
    return place.key === key;
  });
  Navigation.push(this.props.componentId, {
    component: {
      name: 'rnplay.PlaceDetailScreen',
      passProps: {
          selectedPlace: selectPlace 
      },
      options: {
        topBar: {
          title: {
            text: selectPlace.name
          },
          visible: true,
          backButton: {
                visible: true,
          },   
        },
       }
      }
  });
 }
 
  render() {
    return (
      <View>
        <PlaceList places={this.props.places} onItemSelected={this.itemSelectHandler}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

export default connect(mapStateToProps)(FindPlaceScreen);
