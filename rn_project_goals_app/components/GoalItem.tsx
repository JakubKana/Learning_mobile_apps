import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface GoalItemProps {
  id: string;
  title: string;
  onDelete: (goalId: string) => void;
}

const GoalItem = (props: GoalItemProps) => {
  const { onDelete, title, id } = props;
  return (
    <TouchableOpacity onPress={() => onDelete(id)}>
      <View style={styles.listItem}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: '#000',
    borderWidth: 1,
    marginVertical: 10,
  },
});

export { GoalItem };
