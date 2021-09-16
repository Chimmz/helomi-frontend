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

export const setChats = chats => {
   return dispatch => {
      console.log(chats);
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

export const addUserAsFriend = (authToken, userId) => async dispatch => {
   try {
      const response = await API.addUserAsFriend(authToken, userId);
      console.log('Response: ', response);
      const newAlert = { id: uuidv4() };

      switch (response.status) {
         case 'success':
            console.log(response);
            const addedUser = response.user;
            delete addedUser.friends;

            dispatch({ type: ADD_CHAT, payload: { chat: addedUser } });

            newAlert.type = 'success';
            newAlert.text = `${addedUser.username} is now your friend`;
            break;

         case 'fail':
         case 'error':
            newAlert.type = 'warning';
            newAlert.text =
               response.status === 'fail'
                  ? response.message
                  : "Couldn't add. Something went wrong";
            break;
      }

      dispatch(addAlert(newAlert));
   } catch (err) {
      console.log('In chat creators:', err);
   }
};
