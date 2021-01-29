import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';

//Firebase
import firestore from '@react-native-firebase/firestore';

import {UserContext} from '../context/Context';
import FAB from 'react-native-fab';
import {globalStyles} from '../globalStyles';
import {SET_ACTIVE_CHAT, SET_CHAT_LIST} from '../context/action.type';
import MiniCard from '../components/MiniCard';
import {fetchChat} from '../context/databaseFunctions';

const Home = ({navigation}) => {
  const {appData, dispatch} = useContext(UserContext);
  const {user, chatList, searchChatByName} = appData;

  const [filterChatList, setFilterChatList] = useState(chatList);

  const filterChatListfun = (searchChatByName) => {
    var filterlist = chatList.filter((chat) => {
      const {userDetailes1, userDetailes2} = chat;
      if (userDetailes1.name.includes(searchChatByName)) return true;
      if (userDetailes2.name.includes(searchChatByName)) return true;
    });
    setFilterChatList(filterlist);
  };

  const openChat = (chat) => {
    navigation.navigate('Chat');
    dispatch({type: SET_ACTIVE_CHAT, payload: chat});
    fetchChat({chatId: chat.chatId, dispatch});
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

  useEffect(() => {
    if (chatList.length) filterChatListfun(searchChatByName);
  }, [searchChatByName]);

  useEffect(() => {
    setFilterChatList(chatList);
  }, [chatList]);

  return (
    <View style={globalStyles.container}>
      {filterChatList && (
        <FlatList
          data={filterChatList}
          keyExtractor={(filterChatList) => filterChatList.chatId}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => openChat(item)}>
              {item.userDetailes1.uid === user.uid ? (
                <MiniCard name={item.userDetailes2.name} chatId={item.chatId} />
              ) : (
                <MiniCard name={item.userDetailes1.name} chatId={item.chatId} />
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
