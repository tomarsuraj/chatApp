import React, {useContext, useEffect, useState} from 'react';

import {UserContext} from '../context/Context';

import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// Action type
import {SET_ACTIVE_CHAT} from '../context/action.type';

// Components
import MiniCard from '../components/MiniCard';
// Global Style Sheet
import {globalStyles} from '../globalStyles';

const Search = ({navigation}) => {
  const {appData, dispatch} = useContext(UserContext);

  const {chatList, user} = appData;

  const [filterChatList, setFilterChatList] = useState(chatList);

  const openChat = (chat) => {
    navigation.navigate('Chat');
    dispatch({type: SET_ACTIVE_CHAT, payload: chat});
  };
  console.log('chatList SSSS', chatList);

  const filterChatListfun = (val) => {
    var filterlist = chatList.filter((chat) => {
      const {userDetailes1, userDetailes2} = chat;
      if (userDetailes1.name.includes(val)) return true;
      if (userDetailes2.name.includes(val)) return true;
    });
    setFilterChatList(filterlist);
    console.log('filterlist SSSS', filterlist);
  };

  return (
    <View>
      <TextInput
        style={[
          globalStyles.input,
          {marginHorizontal: 15, borderColor: '#075E54'},
        ]}
        onChangeText={(val) => filterChatListfun(val)}
      />
      {chatList && (
        <FlatList
          data={filterChatList}
          keyExtractor={(filterChatList) => filterChatList.chatId}
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
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
