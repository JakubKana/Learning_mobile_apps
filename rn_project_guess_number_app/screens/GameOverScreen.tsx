import React from "react";
import { View, StyleSheet, Button, Image, Text } from "react-native";
import { UserNumber } from "../App";
import { TitleText } from "../components/TitleText";
import { BodyText } from "../components/BodyText";

import SuccessImage from "../assets/success.png";
import { Colors } from "../constants/colors";
import { MainButton } from "../components/MainButton";

interface GameOverScreenProps {
  roundsNumber: number;
  userNumber: UserNumber;
  onRestart: () => void;
}

const GameOverScreen = (props: GameOverScreenProps) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={1000}
          style={styles.image}
          source={SuccessImage}
          // source={{
          //   uri:
          //     "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",
          // }}
          resizeMode={"cover"}
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "darkblue",
    height: 300,
    width: 300,
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  resultContainer: {
    width: "80%",
    marginHorizontal: 30,
    marginVertical: 15,
  },
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "OpenSans-Bold",
  },
});

export { GameOverScreen };
