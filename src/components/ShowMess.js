import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '../context/Context';
import {markMessageAsSeen} from '../context/databaseFunctions';

const ShowMess = ({item}) => {
  const {appData, dispatch} = useContext(UserContext);
  const {activeChat, user} = appData;
  const {chatId} = activeChat;

  if (!item.isMessageSeen && appData.user.uid !== item.senderId) {
    markMessageAsSeen({chatId, messageId: item.messageId, name: user.name});
  }

  return (
    <View style={styles.messContainer}>
      {appData.user.uid !== item.senderId ? (
        <View style={styles.leftMess}>
          <Text style={styles.mess}>{item.message}</Text>
          <Text style={styles.date}>
            {item.timeStamp.toDate().toLocaleTimeString()}
          </Text>
        </View>
      ) : (
        <View style={styles.rightMess}>
          <Text style={styles.mess}>{item.message}</Text>
          <View style={styles.MessDetailContainer}>
            <Text style={styles.date}>
              {item.timeStamp.toDate().toLocaleTimeString()}
            </Text>
            {item.isMessageSeen ? (
              <Icon name="check-all" size={16} style={{color: '#02B290'}} />
            ) : (
              <Icon name="check-all" size={16} />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ShowMess;

const styles = StyleSheet.create({
  messContainer: {
    marginVertical: 5,
    marginHorizontal: 8,
  },

  leftMess: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
  },
  rightMess: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderRadius: 5,
    padding: 5,
  },
  date: {
    fontSize: 10,
    marginTop: 3,
    marginHorizontal: 5,
  },
  mess: {
    fontSize: 16,
    paddingRight: 10,
    paddingLeft: 5,
  },
  MessDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
