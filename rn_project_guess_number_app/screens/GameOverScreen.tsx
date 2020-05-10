import React from "react";
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from "react-native";
import { UserNumber } from "../App";
import { TitleText } from "../components/TitleText";
import { BodyText } from "../components/BodyText";

import SuccessImage from "../assets/success.png";
import PsopassppafImage from "../assets/psopassppaf.gif";
import { Colors } from "../constants/colors";
import { MainButton } from "../components/MainButton";

interface GameOverScreenProps {
  roundsNumber: number;
  userNumber: UserNumber;
  onRestart: () => void;
}

const GameOverScreen = (props: GameOverScreenProps) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            fadeDuration={1000}
            style={styles.image}
            source={PsopassppafImage}
            // source={{
            //   uri:
            //     "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",
            // }}
            resizeMode={"cover"}
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the
            number <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "darkblue",
    height: Dimensions.get("window").width * 0.7,
    width: Dimensions.get("window").width * 0.7,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  resultContainer: {
    width: "80%",
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "OpenSans-Bold",
  },
});

export { GameOverScreen };
