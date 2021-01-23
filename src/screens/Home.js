import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
//Firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {UserContext} from '../context/Context';
import FAB from 'react-native-fab';
import {globalStyles} from '../globalStyles';
import {SET_ACTIVE_CHAT, SET_CHAT_LIST} from '../context/action.type';
import MiniCard from '../components/MiniCard';

const Home = ({navigation}) => {
  const {appData, dispatch} = useContext(UserContext);
  const {user, chatList} = appData;

  const openChat = (chat) => {
    navigation.navigate('Chat');
    dispatch({type: SET_ACTIVE_CHAT, payload: chat});
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Chats')
      .where('usersUid', 'array-contains', user.uid)
      .onSnapshot((querySnapshot) => {
        const chatlist = [];

        querySnapshot.docs.forEach((chat) => {
          chatlist.push(chat._data);
        });
        if (chatlist.length != 0) {
          dispatch({type: SET_CHAT_LIST, payload: chatlist});
        }
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Button title="Sign Out" onPress={() => auth().signOut()} />
      {chatList && (
        <FlatList
          data={chatList}
          keyExtractor={(chatList) => chatList.chatId}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => openChat(item)}>
              {item.userDetailes1.uid === user.uid ? (
                <MiniCard item={item.userDetailes2} />
              ) : (
                <MiniCard item={item.userDetailes1} />
              )}
            </TouchableOpacity>
          )}
        />
      )}
      <FAB
        buttonColor="red"
        iconTextColor="#FFFFFF"
        onClickAction={() => {
          navigation.navigate('AddChat');
        }}
        visible={true}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  addChatButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#0f4c75',
    borderRadius: 100,
  },
});
