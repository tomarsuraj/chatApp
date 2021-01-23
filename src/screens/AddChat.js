import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import {UserContext} from '../context/Context';

//Firebase
import firestore from '@react-native-firebase/firestore';

// Action types
import {SET_ACTIVE_CHAT} from '../context/action.type';

// Components
import MiniCard from '../components/MiniCard';

const AddChat = ({navigation}) => {
  const {appData, dispatch} = useContext(UserContext);
  const {user, chatList} = appData;
  const [allUsers, setAllUsers] = useState(null);

  const addChat = async (friendDetails) => {
    // Check chat present in system with firend

    for (const chatDetails of chatList) {
      const {usersUid} = chatDetails;
      if (usersUid.includes(friendDetails.uid)) {
        // if chat presnt in system navigate to prev chat
        navigation.navigate('Chat');
        dispatch({type: SET_ACTIVE_CHAT, payload: chatDetails});

        return false;
      }
    }

    // add chat to database if prev chat with firend is not present
    const add = firestore().collection('Chats').doc();

    add
      .set({
        usersUid: [friendDetails.uid, user.uid],
        userDetailes1: user,
        userDetailes2: friendDetails,
        chatId: add.id,
      })
      .then(() => {
        console.log('Friend added!');
        // nav to new chat created
        navigation.navigate('Chat', add.id);
      })
      .catch((error) => {
        console.log('Error while adding firend', error);
      });
  };

  const getAllUser = async () => {
    console.log('GET ALL USER FUN');

    firestore()
      .collection('Users')
      .where('uid', '!=', user.uid)
      .get()
      .then((querySnapshot) => {
        console.log('Total users: ', querySnapshot._docs);

        const users = [];

        querySnapshot.docs.forEach((user) => {
          users.push(user._data);
        });

        setAllUsers(users);
        console.log('users', users);
      });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <View>
      <FlatList
        data={allUsers}
        keyExtractor={(allUsers) => allUsers.uid}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => addChat(item)}>
            <MiniCard item={item} key={item.uid} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => <Text>NO </Text>}
      />
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({});
