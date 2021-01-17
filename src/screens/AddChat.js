import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import {UserContext} from '../context/Context';

//Firebase
import firestore from '@react-native-firebase/firestore';

import MiniCard from '../components/MiniCard';

const AddChat = () => {
  const {appData} = useContext(UserContext);
  const {user} = appData;
  const [allUsers, setAllUsers] = useState(null);

  const addChat = async (friendDetails) => {
    console.log('Add Chat Called');

    const add = firestore().collection('Chats').doc();

    console.log('ADD ', add);

    add
      .set({
        usersUid: [friendDetails.uid, user.uid],
        userDetailes1: user,
        userDetailes2: friendDetails,
        chatId: add.id,
      })
      .then(() => {
        console.log('Friend added!');
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

  console.log('ADD CHAT SCREEN');

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
