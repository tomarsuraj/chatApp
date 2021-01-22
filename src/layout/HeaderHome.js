import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import IconI from 'react-native-vector-icons/Ionicons';
import IconO from 'react-native-vector-icons/Octicons';

const HeaderHome = ({navigation}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logText}>ChatApp</Text>
        </TouchableOpacity>
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
