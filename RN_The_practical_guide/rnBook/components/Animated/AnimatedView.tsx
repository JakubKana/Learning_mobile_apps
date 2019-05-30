import React from "react";
import { Component } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

/* setValue - Directly set values on ANimated.Value
    addListner: Due to the asynchronous nature of animations, if you want to know what the Animated value is,
    you need to observe updates through a listener.
    removeListener / removeAllListeners - If you've added listeners using the addListener function !Important is to remove listeners when unmounted component
    stopAnimation - This stops the animation execution. You can also pass an optional callback function that will be executed when the animation is stopped.
    interpolate - We will cover this method later in this chapter
*/

class AnimatedView extends Component {
  state = {
    items: 5,
    fadeAnim: new Animated.Value(0),
    slideAnim: new Animated.Value(-100),
    scaleAnim: new Animated.Value(0),
    animatedValue: new Animated.Value(0)
  };

  componentDidMount() {
    const { timing } = Animated;
    const { fadeAnim, slideAnim, scaleAnim } = this.state;
    // const slideAnim = this.state.animatedValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [-100, 0]
    // });

    timing(fadeAnim, {
      duration: 3000,
      delay: 400,
      easing: Easing.bounce,
      toValue: 1
    }).start();
    timing(slideAnim, { toValue: 0 }).start();
    timing(scaleAnim, { toValue: 1 }).start();
    // timing(this.state.animatedValue, { toValue: 1 }).start();
  }

  items() {
    return Array(this.state.items)
      .fill(1)
      .map((item, index) => {
        switch (index) {
          case 1:
            // return Animated.View for relevant circle with index 1
            return (
              <Animated.View
                style={[
                  styles.item,
                  {
                    transform: [{ scale: this.state.scaleAnim }]
                  }
                ]}
                key={index}
              >
                <Text style={styles.itemText}>{index}</Text>
              </Animated.View>
            );
          case 2:
            // return Animated.View for relevant circle with index 2
            return (
              <Animated.View
                style={[
                  styles.item,
                  {
                    transform: [
                      {
                        translateY: this.state.slideAnim
                      }
                    ]
                  }
                ]}
                key={index}
              >
                <Text style={styles.itemText}>{index}</Text>
              </Animated.View>
            );
          case 3:
            // return Animated.View for relevant circle with index 3
            return (
              <Animated.View
                style={[
                  styles.item,
                  {
                    transform: [{ translateX: this.state.slideAnim }]
                  }
                ]}
                key={index}
              >
                <Text style={styles.itemText}>{index}</Text>
              </Animated.View>
            );

          case 4:
            // return Animated.View for relevant circle with index 4
            return (
              <Animated.View
                style={[
                  styles.item,
                  {
                    transform: [
                      {
                        translateX: this.state.slideAnim
                      },
                      {
                        translateY: this.state.slideAnim
                      }
                    ]
                  }
                ]}
                key={index}
              >
                <Text style={styles.itemText}>{index}</Text>
              </Animated.View>
            );

          default:
            // return Animated.View for all other circles
            return (
              <Animated.View
                style={[
                  styles.item,
                  {
                    opacity: this.state.fadeAnim
                  }
                ]}
                key={index}
              >
                <Text style={styles.itemText}>{index}</Text>
              </Animated.View>
            );
        }
      });
  }

  render() {
    return this.items();
  }
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  itemText: {
    fontFamily: "serif",
    color: "white"
  },
  item: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 25,
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AnimatedView;
