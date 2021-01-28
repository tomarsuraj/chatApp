import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {UserContext} from '../context/Context';

const ChatHeader = () => {
  const {appData} = useContext(UserContext);

  const {activeChat, user} = appData;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logContainer}>
        {activeChat.userDetailes1.uid === user.uid ? (
          <Text style={styles.logText}>{activeChat.userDetailes2.name}</Text>
        ) : (
          <Text style={styles.logText}>{activeChat.userDetailes1.name}</Text>
        )}
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
  },
  logContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    marginLeft: 0,
  },
  logText: {
    fontSize: 24,
    color: '#fff',
  },
});
