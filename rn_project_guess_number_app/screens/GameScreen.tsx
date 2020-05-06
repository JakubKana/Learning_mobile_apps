import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { NumberContainer } from "../components/NumberContainer";
import { Card } from "../components/Card";
import { styles } from "./GameScreenStyles";

interface GameScreenProps {
  userChoice: number;
  onGameOver: (numOfRounds: number) => void;
}

type Direction = "LOWER" | "GREATER";

const genRandom = (min: number, max: number, exclude: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return genRandom(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props: GameScreenProps) => {
  const [currentGuess, setCurrentGuess] = useState(
    genRandom(1, 100, props.userChoice),
  );
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction: Direction) => {
    if (
      (direction === "LOWER" && currentGuess < props.userChoice) ||
      (direction === "GREATER" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don' lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "LOWER") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = genRandom(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );

    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler("LOWER")} />
        <Button title="GREATER" onPress={() => nextGuessHandler("GREATER")} />
      </Card>
    </View>
  );
};

export { GameScreen };
