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

/**
 * Animated.parallel - Executes animations in parallel
 * Animated.delay - Delays execution of animation
 * Animated.sequence - Executes animations in sequence
 * Animated.stagger - Executes in sequence with delay
 * Animated.decay - Animates a value from an initial velocity to zero based on deceleration
 * Animated.spring - S
 */

class AnimatedView extends Component {
  state = {
    items: 5,
    // fadeAnim: new Animated.Value(0),
    // slideAnim: new Animated.Value(-100),
    // scaleAnim: new Animated.Value(0),
    animatedValue: new Animated.Value(0),
    animatedColor: new Animated.Value(0)
  };

  componentDidMount() {
    const { timing, parallel, sequence, delay, stagger } = Animated;
    const { animatedColor, animatedValue } = this.state;
    // const slideAnim = this.state.animatedValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [-100, 0]
    // });

    // timing(fadeAnim, {
    //   duration: 3000,
    //   delay: 400,
    //   easing: Easing.bounce,
    //   toValue: 1
    // }).start();
    // timing(slideAnim, { toValue: 0 }).start();
    // timing(scaleAnim, { toValue: 1 }).start();

    // timing(animatedValue, { toValue: 1 }).start();

    sequence([
      delay(200),
      timing(animatedValue, { toValue: 1 }),
      delay(200),
      timing(animatedValue, { toValue: 2 }),
      parallel([
        timing(animatedColor, { toValue: 100 }),
        stagger(600, [
          timing(animatedValue, { toValue: 1 }),
          timing(animatedValue, { toValue: 0 }),
          timing(animatedValue, { toValue: 1 })
        ])
      ])
    ]).start();
  }

  items() {
    const slideAnim = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0]
    });
    const color = this.state.animatedColor.interpolate({
      inputRange: [0, 50, 100],
      outputRange: ["gray", "black", "gray"]
    });
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
                    transform: [{ scale: this.state.animatedValue }],
                    backgroundColor: color
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
                        translateY: slideAnim
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
                    transform: [{ translateX: slideAnim }]
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
                        translateX: slideAnim
                      },
                      {
                        translateY: slideAnim
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
                    opacity: this.state.animatedValue
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
    return <View style={styles.area}>{this.items()}</View>;
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
