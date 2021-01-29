import React from 'react';
import {Text, View} from 'react-native';

const EmptyContainer = () => {
  return (
    <View
      style={{
        backgroundColor: 'pink',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 34}}> Loading Data......</Text>
    </View>
  );
};

export default EmptyContainer;
