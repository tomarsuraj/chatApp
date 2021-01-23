import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from 'react-native';

//Firebase
import firestore from '@react-native-firebase/firestore';

import {UserContext} from '../context/Context';
import {SET_CHAT} from '../context/action.type';
import ShowMess from '../components/ShowMess';

const Chat = ({route}) => {
  const {appData, dispatch} = useContext(UserContext);
  const {chat, activeChat} = appData;
  const {chatId} = activeChat;
  const [textMessagesToSend, setTextMessagesToSend] = useState(null);

  const sendMessage = async () => {
    const send = firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('messages')
      .doc();

    send
      .set({
        message: textMessagesToSend,
        senderId: appData.user.uid,
        timeStamp: firestore.Timestamp.now(),
        messageId: send.id,
      })
      .then(() => {
        console.log('Message send!');
        setTextMessagesToSend('');
      })
      .catch((error) => console.log('Error in sending mess', error));
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timeStamp', 'desc')
      .onSnapshot((querySnapshot) => {
        const chat = [];

        querySnapshot.docs.forEach((mess) => {
          chat.push(mess._data);
        });
        dispatch({type: SET_CHAT, payload: chat});
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        {chat && (
          <FlatList
            data={chat}
            inverted={-1}
            keyExtractor={(chat) => chat.messageId}
            renderItem={({item}) => <ShowMess item={item} />}
            ListEmptyComponent={() => <Text>NO </Text>}
          />
        )}
      </View>
      <View style={styles.sendContainer}>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Enter Messages"
          onChangeText={(val) => setTextMessagesToSend(val)}
          value={textMessagesToSend}
        />
        <View style={styles.sendButton}>
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    flexDirection: 'column',
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#666666',
    marginHorizontal: 10,
    marginVertical: 5,
    flex: 4,
  },
  messageContainer: {
    flex: 5,
  },
  sendContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  sendButton: {
    flex: 1,
  },
});
