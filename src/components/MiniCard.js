import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '../context/Context';

const MiniCard = ({name, chatId}) => {
  const {appData} = useContext(UserContext);

  const {chats} = appData;
  const chat = chats[chatId];

  return (
    <View style={styles.miniCard}>
      <Icon
        name="account"
        backgroundColor="#3b5998"
        size={50}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.senderName}>{name}</Text>
        <Text style={styles.lastMess}>
          {chat && chat[0] && chat[0].message}
        </Text>
      </View>
    </View>
  );
};

export default MiniCard;

const styles = StyleSheet.create({
  miniCard: {
    marginVertical: 3,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
  },
  textContainer: {
    flex: 5,
    alignContent: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  senderName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lastMess: {
    fontSize: 10,
  },
});
