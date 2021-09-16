import * as actionTypes from './chat.action.types';

const initState = {
   chats: []
};

const chatReducer = (state = initState, action) => {
   const { type, payload } = action;
   switch (type) {
      case actionTypes.SET_CHATS:
         // if (!payload.chats.length)
         //    return {
         //       chats:
         //    }
         return {
            ...state,
            chats: payload.chats.map(chat => ({
               ...chat,
               isOnline: false,
               isTyping: false,
               isLoadingMsgs: true
            }))
         };

      case actionTypes.SOMEONE_IS_TYPING:
         return {
            ...state,
            chats: state.chats.map(chat =>
               chat._id === payload.chatId
                  ? { ...chat, isTyping: payload.isTyping }
                  : { ...chat }
            )
         };

      case actionTypes.SET_CHAT_MSGS_LOADING:
         const { isLoading } = payload;
         return {
            ...state,
            chats: state.chats.map(chat =>
               chat._id === payload.chatId
                  ? { ...chat, isLoadingMsgs: isLoading }
                  : { ...chat }
            )
         };

      case actionTypes.ADD_CHAT:
         return {
            ...state,
            chats: [
               ...state.chats,
               { ...payload.chat, isTyping: false, isLoadingMsgs: true }
            ]
         };

      case actionTypes.DELETE_CHAT:
         return {
            ...state,
            chats: state.chats.filter(chat => chat._id !== payload.chatId)
         };
      case actionTypes.RESET_CHATS:
         return {
            chats: {}
         };

      default:
         return state;
   }
};

export default chatReducer;
