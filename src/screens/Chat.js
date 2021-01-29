import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

//Firebase functions
import {fetchChat, sendMessage} from '../context/databaseFunctions';

import {UserContext} from '../context/Context';
import ShowMess from '../components/ShowMess';
import {globalStyles} from '../globalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Chat = () => {
  const {appData} = useContext(UserContext);
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
          style={[globalStyles.input, styles.input]}
          keyboardType="default"
          placeholder="Enter Messages"
          onChangeText={(val) => setTextMessagesToSend(val)}
          value={textMessagesToSend}
        />
        <TouchableOpacity
          style={styles.sendIcon}
          onPress={() =>
            sendMessage({
              appData,
              chatId,
              textMessagesToSend,
              setTextMessagesToSend,
            })
          }>
          <Icon
            name="send"
            color="#075E54"
            size={44}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAD5E2',
    flexDirection: 'column',
  },
  input: {
    flex: 4,
    marginHorizontal: 10,
    height: 50,
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
  sendIcon: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
