import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconO from 'react-native-vector-icons/Octicons';
import {UserContext} from '../context/Context';

const MiniCard = ({name, chatId}) => {
  const {appData} = useContext(UserContext);

  const {chats, user} = appData;
  const chat = chats[chatId];

  return (
    <View style={styles.miniCard}>
      <IconM
        name="account"
        backgroundColor="#3b5998"
        size={50}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <View style={{width: '90%'}}>
          <Text style={styles.senderName}>{name}</Text>
          <Text style={styles.lastMess} numberOfLines={2}>
            {chat && chat[0] && chat[0].message}
          </Text>
        </View>

        {chat &&
          chat[0] &&
          !chat[0].isMessageSeen &&
          chat[0].senderId !== user.uid && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '5%',
                marginRight: 5,
              }}>
              <IconO
                name="primitive-dot"
                size={24}
                style={{color: '#075E54'}}
              />
            </View>
          )}
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
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  senderName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lastMess: {
    fontSize: 16,
  },
});
