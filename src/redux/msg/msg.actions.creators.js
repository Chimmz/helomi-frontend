import * as actionTypes from './msg.action.types';
import * as utils from '../../utils/api';
import * as actionCreators from '../chat/chat.action.creators';

export const addFetchedChatMsgs = (chatId, msgs) => ({
   type: actionTypes.FETCH_CHAT_MSGS,
   payload: { chatId, msgs }
});

export const addNewMsg = (chatId, msg) => ({
   type: actionTypes.ADD_NEW_MSG,
   payload: { chatId, msg }
});

export const fetchChatMsgs = (authToken, chatId) => {
   return async dispatch => {
      try {
         const response = await utils.API.fetchChatMsgs(authToken, chatId);
         // console.log('response', response);
         const { msgs } = await response;
         dispatch(addFetchedChatMsgs(chatId, msgs));
      } catch (err) {
         console.log('ERR', err);
      } finally {
         dispatch(
            actionCreators.setChatMsgsLoading({ chatId, isLoading: false })
         );
      }
   };
};

export const markMsgsAsRead = (msgIdsArr, chatId) => ({
   type: actionTypes.MARK_MSGS_AS_READ,
   payload: { msgIdsArr, chatId }
});
