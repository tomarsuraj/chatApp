import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import {UserContext} from '../context/Context';

//Firebase
import firestore from '@react-native-firebase/firestore';

import {addChat} from '../context/databaseFunctions';

// Components
import MiniCard from '../components/MiniCard';

const AddChat = ({navigation}) => {
  const {appData, dispatch} = useContext(UserContext);
  const {user, chatList} = appData;
  const [allUsers, setAllUsers] = useState(null);

  const getAllUser = async () => {};

  useEffect(() => {
    const susbcriber = firestore()
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

    return () => susbcriber();
  }, []);

  return (
    <View>
      <FlatList
        data={allUsers}
        keyExtractor={(allUsers) => allUsers.uid}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              addChat({
                chatList,
                user,
                friendDetails: item,
                navigation,
                dispatch,
              })
            }>
            <MiniCard name={item.name} key={item.uid} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => <Text>NO </Text>}
      />
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({});
