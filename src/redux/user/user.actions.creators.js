import {
   AUTH_ERROR,
   CHANGE_PROFILE_PHOTO,
   LOAD_USER,
   LOGOUT_USER,
   RESET_USER,
   SET_USER
} from './user.actions.type';

import { v4 as uuidv4 } from 'uuid';
import { flashAlert } from '../alert/alert.action.creators';
import { setChats } from '../chat/chat.action.creators';
import { RESET_CHATS } from '../chat/chat.action.types';
import { RESET_MSGS } from '../msg/msg.action.types';
import { AlertConstructor } from '../alert/alert.utils';
import * as utils from '../../utils/api';
import * as userUtils from './user.utils';

export const setUser = (user = null, token = '', twilioAccessToken) => {
   return { type: SET_USER, payload: { user, token, twilioAccessToken } };
};

export const loadUser = () => async dispatch => {
   const token = userUtils.getTokenInStorage();
   const res = await utils.API.authenticateToken(token);

   if (res.status === 'success') {
      dispatch(setUser(res.user, token, res.twilioAccessToken));
      dispatch(setChats(res.user.friends));
   } else dispatch(authError());
   // console.log('In loadUser, ', res);
};

export const authError = () => ({ type: AUTH_ERROR });
export const resetUser = () => ({ type: RESET_USER });
export const logOutUser = () => dispatch => {
   dispatch({ type: LOGOUT_USER });
   dispatch({ type: RESET_CHATS });
   dispatch({ type: RESET_MSGS });
};

export const changeProfilePhoto = fileName => ({
   type: CHANGE_PROFILE_PHOTO,
   payload: { fileName }
});

function handleAuthSuccess(res, dispatch) {
   const { user } = res.data;
   const { token, twilioAccessToken } = res;
   const newAlert = new AlertConstructor(
      'You have been successfully logged in',
      'success',
      uuidv4()
   );
   dispatch(flashAlert(newAlert));
   dispatch(setUser(user, token, twilioAccessToken));
   dispatch(setChats(user.friends));
}

function handleAuthFailure(res, dispatch) {
   const newAlert = new AlertConstructor(res.message, 'warning', uuidv4());
   dispatch(flashAlert(newAlert));
   dispatch(authError());
}

function handleAuthError(res, dispatch) {
   const newAlert = new AlertConstructor(
      res.message ||
         'Sorry, we could not log you in. Please check your internet connection',
      'warning',
      uuidv4()
   );
   dispatch(flashAlert(newAlert));
   dispatch(authError());
}

export const authenticate = (authStyle, formData) => {
   return async dispatch => {
      const res = await utils.API[authStyle](formData);
      // console.log(res);
      const resStatus = res.status;

      if (resStatus === 'success') handleAuthSuccess(res, dispatch);
      else if (resStatus === 'fail') handleAuthFailure(res, dispatch);
      else if (resStatus === 'error') handleAuthError(res, dispatch);
   };
};
