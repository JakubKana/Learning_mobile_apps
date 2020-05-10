import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  FlatList,
  ListRenderItemInfo,
  Dimensions,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { NumberContainer } from "../components/NumberContainer";
import { Card } from "../components/Card";
import { styles as defaultStyles } from "../constants/default-styles";
import { styles } from "./GameScreenStyles";
import { MainButton } from "../components/MainButton";

import Ionicons from "react-native-vector-icons/Ionicons";
import { BodyText } from "../components/BodyText";

interface GameScreenProps {
  userChoice: number;
  onGameOver: (numOfRounds: number) => void;
}

type Direction = "LOWER" | "GREATER";

type DeviceDimensions = {
  availableDeviceWidth: number;
  availableDeviceHeight: number;
};

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

const renderListItem = (listLength: number, itemData: ListRenderItemInfo<string>) => (
  <View key={itemData.item} style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props: GameScreenProps) => {
  const initialGuess = genRandom(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [{ availableDeviceWidth, availableDeviceHeight }, setAvailableDeviceDimensions] = useState<
    DeviceDimensions
  >({
    availableDeviceWidth: Dimensions.get("window").width,
    availableDeviceHeight: Dimensions.get("window").height,
  });
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceDimensions({
        availableDeviceHeight: Dimensions.get("window").height,
        availableDeviceWidth: Dimensions.get("window").width,
      });
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction: Direction) => {
    if (
      (direction === "LOWER" && currentGuess < props.userChoice) ||
      (direction === "GREATER" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don' lie!", "You know that this is wrong...", [{ text: "Sorry!", style: "cancel" }]);
      return;
    }
    if (direction === "LOWER") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = genRandom(currentLow.current, currentHigh.current, currentGuess);

    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
  };

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  const cardStyle = StyleSheet.flatten([
    styles.buttonContainer,
    { marginTop: availableDeviceHeight > 400 ? 20 : 5 },
  ]);

  let gameControls = (
    <React.Fragment>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={cardStyle}>
        <MainButton onPress={() => nextGuessHandler("LOWER")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler("GREATER")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
    </React.Fragment>
  );

  if (availableDeviceHeight < 400) {
    gameControls = (
      <View style={styles.controls}>
        <MainButton onPress={() => nextGuessHandler("LOWER")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton onPress={() => nextGuessHandler("LOWER")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Opponent's guess</Text>
      {gameControls}
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index),
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={item => renderListItem(pastGuesses.length, item)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

export { GameScreen };
