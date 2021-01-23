import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//Icon
import IconI from 'react-native-vector-icons/Ionicons';
import IconO from 'react-native-vector-icons/Octicons';

import {useNavigation} from '@react-navigation/native';
const HomeHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logContainer}>
        <Text style={styles.logText}>ChatApp</Text>
      </View>
      <View style={styles.optionContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <IconI name="search" color="#fff" size={24} style={styles.icon} />
        </TouchableOpacity>
        <IconO
          name="kebab-vertical"
          color="#fff"
          size={24}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
  },
  logContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  logText: {
    fontSize: 24,
    color: '#fff',
  },
  optionContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 15,
  },
});
