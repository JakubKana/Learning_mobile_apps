import React from "react";
import { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation
} from "react-native";
const { Types, Properties, create, configureNext } = LayoutAnimation;

const customAnimationConfig = create(300, Types.easeIn, Properties.opacity);

const CustomLayoutAnimation = {
  duration: 1000,
  create: {
    delay: 100,
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.2,
    initialVelocity: 1
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.scaleXY
  },
  delete: {
    type: LayoutAnimation.Types.easeOut,
    property: LayoutAnimation.Properties.opacity
  }
};

const ButtonsBar = ({ onPress }) => (
  <View style={styles.topBar}>
    <TouchableOpacity style={styles.button} onPress={() => onPress(1)}>
      <Text style={styles.buttonText}>1</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => onPress(2)}>
      <Text style={styles.buttonText}>2</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => onPress(3)}>
      <Text style={styles.buttonText}>3</Text>
    </TouchableOpacity>
  </View>
);

export default class LayoutAnimationView extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   activeIndex: 0
    // };
    this.state = {
      items: 1
    };
  }

  componentDidMount() {
    configureNext(create(500, Types.linear, Properties.scaleXY));
  }

  onPressDot(items) {
    configureNext(CustomLayoutAnimation);

    this.setState({ items });
  }

  onPress(activeIndex) {
    //LayoutAnimation.easeInEaseOut();
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    configureNext(customAnimationConfig);
    this.setState({ activeIndex });
  }

  getStyleByCollapsingIndex(index) {
    return {
      redStyle: index === 1 && styles.collapsed,
      greenStyle: index === 2 && styles.collapsed,
      blueStyle: index === 3 && styles.collapsed
    };
  }

  get items() {
    return Array(this.state.items)
      .fill(1)
      .map((item, index) => <View style={styles.item} key={index} />);
  }

  render() {
    const { redStyle, greenStyle, blueStyle } = this.getStyleByCollapsingIndex(
      this.state.activeIndex
    );
    return (
      <View style={styles.container}>
        <ButtonsBar onPress={this.onPressDot.bind(this)} />
        <View style={styles.area}>{this.items}</View>
      </View>
      // <View style={styles.container}>
      //   <View style={styles.topBar}>
      //     <TouchableOpacity
      //       style={styles.button}
      //       onPress={() => this.onPress(1)}
      //     >
      //       <Text style={styles.buttonText}>Collapse Red</Text>
      //     </TouchableOpacity>
      //     <TouchableOpacity
      //       style={styles.button}
      //       onPress={() => this.onPress(2)}
      //     >
      //       <Text style={styles.buttonText}>Collapse Green</Text>
      //     </TouchableOpacity>
      //     <TouchableOpacity
      //       style={styles.button}
      //       onPress={() => this.onPress(3)}
      //     >
      //       <Text style={styles.buttonText}>Collapse Blue</Text>
      //     </TouchableOpacity>
      //     <TouchableOpacity
      //       style={styles.button}
      //       onPress={() => this.onPress(0)}
      //     >
      //       <Text style={styles.buttonText}>Reset</Text>
      //     </TouchableOpacity>
      //   </View>
      //   <View style={[styles.red, styles.area, redStyle]} />
      //   <View style={[styles.green, styles.area, greenStyle]} />
      //   <View style={[styles.blue, styles.area, blueStyle]} />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    backgroundColor: "rgba(1,1,1,.1)",
    height: 90,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  button: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "20%",
    flexWrap: "wrap"
  },
  // area: {
  //   flex: 1
  // },
  area: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },
  item: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 25,
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  collapsed: {
    flex: 0
  },
  red: {
    backgroundColor: "red"
  },
  green: {
    backgroundColor: "green"
  },
  blue: {
    backgroundColor: "blue"
  }
});
