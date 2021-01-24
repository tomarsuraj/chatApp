import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from 'react-native';

//Firebase functions
import {fetchChat, sendMessage} from '../context/databaseFunctions';

import {UserContext} from '../context/Context';
import ShowMess from '../components/ShowMess';

const Chat = () => {
  const {appData, dispatch} = useContext(UserContext);
  const {chats, activeChat} = appData;
  const {chatId} = activeChat;
  const [textMessagesToSend, setTextMessagesToSend] = useState(null);
  const chat = chats[chatId];

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
          <Button
            title="Send"
            onPress={() =>
              sendMessage({
                appData,
                chatId,
                textMessagesToSend,
                setTextMessagesToSend,
              })
            }
          />
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
