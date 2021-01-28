import firestore from '@react-native-firebase/firestore';
import {SET_ACTIVE_CHAT, SET_All_USER, SET_CHATS} from './action.type';

export const sendMessage = async ({
  chatId,
  textMessagesToSend,
  appData,
  setTextMessagesToSend,
}) => {
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

export const fetchChat = async ({chatId, dispatch}) => {
  firestore()
    .collection('Chats')
    .doc(chatId)
    .collection('messages')
    .orderBy('timeStamp', 'desc')
    .onSnapshot((querySnapshot) => {
      const chat = [];

      querySnapshot.docs.forEach((mess) => {
        chat.push(mess._data);
      });

      dispatch({type: SET_CHATS, payload: chat, chatId});
    });
};

export const addChat = async ({
  friendDetails,
  chatList,
  user,
  navigation,
  dispatch,
}) => {
  // Check chat present in system with firend

  for (const chatDetails of chatList) {
    const {usersUid} = chatDetails;
    if (usersUid.includes(friendDetails.uid)) {
      // if chat presnt in system navigate to prev chat
      navigation.navigate('Chat');
      dispatch({type: SET_ACTIVE_CHAT, payload: chatDetails});
      fetchChat({chatId: chatDetails.chatId, dispatch});

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
      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: {
          usersUid: [friendDetails.uid, user.uid],
          userDetailes1: user,
          userDetailes2: friendDetails,
          chatId: add.id,
        },
      });
      navigation.navigate('Chat');
    })
    .catch((error) => {
      console.log('Error while adding firend', error);
    });
};
