import { API } from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';
import {
   SET_CHATS,
   ADD_CHAT,
   SET_CHAT_MSGS_LOADING,
   SOMEONE_IS_TYPING,
   DELETE_CHAT
} from './chat.action.types';
import { addAlert } from '../alert/alert.action.creators';
import { AlertConstructor } from '../alert/alert.utils';

export const setChats = chats => {
   return dispatch => {
      // console.log(chats);
      dispatch({
         type: SET_CHATS,
         payload: { chats }
      });
   };
};

export const setSomeoneIsTyping = ({ chatId, isTyping }) => ({
   type: SOMEONE_IS_TYPING,
   payload: { chatId, isTyping }
});

export const setChatMsgsLoading = ({ chatId, isLoading }) => ({
   type: SET_CHAT_MSGS_LOADING,
   payload: { chatId, isLoading }
});

export const deleteChat = (authToken, chatId) => async dispatch => {
   API.deleteFriend(authToken, chatId);
   dispatch({ type: DELETE_CHAT, payload: { chatId } });
};

const friendAddedSuccess = (response, dispatch) => {
   const addedUser = response.user;
   delete addedUser.friends;
   dispatch({ type: ADD_CHAT, payload: { chat: addedUser } });

   const newAlert = new AlertConstructor(
      `${addedUser.username} is now your friend`,
      'success',
      uuidv4()
   );
   dispatch(addAlert(newAlert));
};

const friendAddedFailOrError = (response, dispatch) => {
   const newAlert = new AlertConstructor(
      response.status === 'fail'
         ? response.message
         : "Couldn't add. Something went wrong",
      'warning',
      uuidv4()
   );
   dispatch(addAlert(newAlert));
};

export const addUserAsFriend = (authToken, userId) => async dispatch => {
   try {
      const response = await API.addUserAsFriend(authToken, userId);
      // console.log('Response: ', response);
      if (response.status === 'success') friendAddedSuccess(response, dispatch);
      else friendAddedFailOrError(response, dispatch);
   } catch (err) {
      console.log('In chat creators:', err);
   }
};
