import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import IconO from 'react-native-vector-icons/Octicons';

const HeaderHome = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logContainer}>
        <Text style={styles.logText}>ChatApp</Text>
      </View>
      <View style={styles.optionContainer}>
        <IconI name="search" color="#fff" size={24} style={styles.icon} />
        <IconM
          name="android-messages"
          color="#fff"
          size={24}
          style={styles.icon}
        />
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

export default HeaderHome;

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: '#075E54',
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
