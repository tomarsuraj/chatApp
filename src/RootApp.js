import React, {useState, useReducer} from 'react';
import App from './App';

// User Context
import {UserContext} from './context/Context';
import appReducer from './context/reducer';

const initialState = {
  isAuthenticated: false,
  user: {},
  chats: {},
  chatList: {},
  activeChat: {},
  searchChatByName: '',
};
const RootApp = () => {
  const [appData, dispatch] = useReducer(appReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        appData,
        dispatch,
      }}>
      <App />
    </UserContext.Provider>
  );
};

export default RootApp;
