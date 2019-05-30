import React from "react";
import { Component } from "react";

import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator
} from "react-native";
import ListItem from "./components/ListItem";
import AnimatedView from "./components/Animated/AnimatedView";

import { addPlace, addPlaceWithLog } from "./store/actions/places";

class App extends Component {
  state = {
    placeName: "",
    places: [],
    isLoading: false
  };

  constructor(props) {
    super(props);
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
    //  this.props.add(this.state.placeName);
    this.props.addThunk(this.state.placeName);
  };

  placeNameChangeHandler = value => {
    this.setState({
      placeName: value
    });
  };

  placesOutput = () => {
    return (
      <FlatList
        style={styles.listContainer}
        data={this.props.places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={info => <ListItem placeName={info.item.value} />}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <AnimatedView />
        </View>
        {/* 
        <ActivityIndicator animating={this.state.isLoading} size="large" />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Seach Places"
            style={styles.placeInput}
            value={this.state.placeName}
            onChangeText={this.placeNameChangeHandler}
          />
          <Button
            title="Add"
            style={styles.placeButton}
            onPress={this.placeSubmitHandler}
          />
        </View>
        <View style={styles.listContainer}>{this.placesOutput()}</View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  },
  listContainer: {
    width: "100%"
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: name => {
      dispatch(addPlace(name));
    },
    addThunk: name => {
      dispatch(addPlaceWithLog(name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
