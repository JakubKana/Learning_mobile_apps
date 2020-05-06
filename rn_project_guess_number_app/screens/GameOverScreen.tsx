import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { UserNumber } from "../App";
interface GameOverScreenProps {
  roundsNumber: number;
  userNumber: UserNumber;
  onRestart: () => void;
}

const GameOverScreen = (props: GameOverScreenProps) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Text>Number of rounds: {props.roundsNumber}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export { GameOverScreen };
