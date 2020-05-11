import React, { useState, useEffect } from "react";
import { View, Image, Text, ScrollView, Dimensions } from "react-native";
import { UserNumber } from "../App";
import { TitleText } from "../components/TitleText";
import { BodyText } from "../components/BodyText";

import SuccessImage from "../assets/success.png";
import PsopassppafImage from "../assets/psopassppaf.gif";
import { MainButton } from "../components/MainButton";
import { styles } from "./GameOverScreenStyles";

interface GameOverScreenProps {
  roundsNumber: number;
  userNumber: UserNumber;
  onRestart: () => void;
}

type DeviceDimensions = {
  availableDeviceWidth: number;
  availableDeviceHeight: number;
};

const GameOverScreen = (props: GameOverScreenProps) => {
  const [{ availableDeviceWidth, availableDeviceHeight }, setAvailableDeviceDimensions] = useState<
    DeviceDimensions
  >({
    availableDeviceWidth: Dimensions.get("window").width,
    availableDeviceHeight: Dimensions.get("window").height,
  });
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

  return (
    
      <ScrollView>
        <View style={styles.screen}>
          <TitleText>The Game is Over!</TitleText>
          <View
            style={{
              ...styles.imageContainer,
              ...{
                width: availableDeviceWidth * 0.7,
                height: availableDeviceWidth * 0.7,
                borderRadius: (availableDeviceWidth * 0.7) / 2,
                marginVertical: availableDeviceHeight / 30,
              },
            }}>
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
          <View style={{ ...styles.resultContainer, ...{ marginVertical: availableDeviceHeight / 60 } }}>
            <BodyText
              style={{
                ...styles.resultText,
                ...{
                  fontSize: availableDeviceHeight < 400 ? 16 : 20,
                },
              }}>
              Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the
              number <Text style={styles.highlight}>{props.userNumber}</Text>
            </BodyText>
          </View>
          <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
      </ScrollView>
  
  );
};

export { GameOverScreen };
