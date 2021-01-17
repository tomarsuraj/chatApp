import {
  IS_AUTHTHENTICATED,
  SET_CHAT,
  SET_CHAT_LIST,
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
    case SET_CHAT:
      return {
        ...state,
        chat: action.payload,
      };

    default:
      return state;
  }
};
