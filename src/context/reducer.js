import {
  IS_AUTHTHENTICATED,
  SET_ACTIVE_CHAT,
  SET_All_USER,
  SET_CHATS,
  SET_CHAT_LIST,
  SET_SEARCH_CHAT_BY_NAME,
  SET_USER,
} from './action.type';

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case IS_AUTHTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
        loading: false,
      };
    case SET_CHAT_LIST:
      return {
        ...state,
        chatList: action.payload,
      };
    case SET_CHATS: {
      const {chatId} = action;
      var chats = state.chats;
      chats[chatId] = action.payload;

      return {
        ...state,
        chats,
      };
    }

    case SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload,
      };
    case SET_SEARCH_CHAT_BY_NAME:
      return {
        ...state,
        searchChatByName: action.payload,
      };

    default:
      return state;
  }
};
