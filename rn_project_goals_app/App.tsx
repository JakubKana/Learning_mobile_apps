/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import { GoalItem } from './components/GoalItem';
import { GoalInput } from './components/GoalInput';
interface ItemData {
  item: Item;
}
type Item = {
  uid: string;
  value: string;
};

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  console.log('RE-RENDERING COMPONENT');
  console.log(courseGoals);

  const addGoalHandler = (enteredGoal: string) => {
    console.log(`Trying to add goal - ${enteredGoal}`);

    if (enteredGoal.length === 0) {
      return;
    }
    // @ts-ignore
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { uid: Math.random().toString(), value: enteredGoal },
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId: string) => {
    console.log(`TO BE DELETED: ${goalId}`);
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal: Item) => goal.uid !== goalId);
    });
  };

  const cancelGoal = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        isAddMode={isAddMode}
        addGoal={addGoalHandler}
        cancelGoal={cancelGoal}
      />
      <FlatList
        keyExtractor={item => item.uid}
        data={courseGoals}
        renderItem={(itemData: ItemData) => (
          <GoalItem
            id={itemData.item.uid}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: '#000',
    borderWidth: 1,
    marginVertical: 10,
  },
});
