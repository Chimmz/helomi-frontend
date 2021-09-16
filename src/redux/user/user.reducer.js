import {
   SET_USER,
   LOAD_USER,
   AUTH_ERROR,
   RESET_USER,
   LOGOUT_USER,
   CHANGE_PROFILE_PHOTO
} from './user.actions.type';
import * as userUtils from './user.utils';

const INITIAL_STATE = {
   currentUser: null,
   token: '',
   twilioAccessToken: '',
   isLoggedIn: false,
   isLoading: true
};

const userReducer = (state = INITIAL_STATE, action) => {
   const { type, payload } = action;
   switch (type) {
      case LOAD_USER:
         return {
            ...state
         };

      case SET_USER:
         userUtils.saveUserInStorage(payload.user);
         userUtils.saveTokenInStorage(payload.token);
         return {
            ...state,
            currentUser: payload.user,
            token: payload.token,
            twilioAccessToken: payload.twilioAccessToken,
            isLoggedIn: true,
            isLoading: false
         };
      case CHANGE_PROFILE_PHOTO:
         return {
            ...state,
            currentUser: {
               ...state.currentUser,
               photo: payload.fileName
            }
         };

      case AUTH_ERROR:
      case RESET_USER:
      case LOGOUT_USER:
         localStorage.removeItem('HELOMI_USER');
         localStorage.removeItem('HELOMI_USER_TOKEN');
         return {
            currentUser: null,
            token: '',
            isLoggedIn: false,
            isLoading: false
         };

      default:
         return state;
   }
};

export default userReducer;
