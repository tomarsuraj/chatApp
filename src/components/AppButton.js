import React from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AppButton = ({title, onPress}) => {
  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    padding: 5,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: '#075E54',
  },
  text: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 24,
  },
});
