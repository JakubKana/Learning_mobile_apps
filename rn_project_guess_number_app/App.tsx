import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "./components/Header";
import { StartGameScreen } from "./screens/StartGameScreen";
import { GameScreen } from "./screens/GameScreen";
import { GameOverScreen } from "./screens/GameOverScreen";

// I am not using expo you can use expo-font
/*
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
}

const [dataLoaded, setDataLoaded] = useState(false);

if(!dataLoaded) {
  return (<AppLoading startAsync={fetchFonts}
     onFinish={() => setDataLoaded(true)}
     onError={(err) => console.log(err)}
     />);
}
*/

export type UserNumber = null | number;

const App: () => React.ReactNode = () => {
  const [userNumber, setUserNumber] = useState<UserNumber>(null);
  const [guessRounds, setGuessRounds] = useState(0);

  const initNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds: number) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={initNewGame}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title={"Guess a Number"} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
