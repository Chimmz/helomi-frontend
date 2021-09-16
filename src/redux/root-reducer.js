import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import msgReducer from './msg/msg.reducer';
import alertReducer from './alert/alert.reducer';
import chatReducer from './chat/chat.reducer';
import videocallReducer from './videocall/videocall.reducer';
import appsettingsReducer from './appsettings/appsettings.reducer';

export default combineReducers({
   msg: msgReducer,
   user: userReducer,
   alert: alertReducer,
   chat: chatReducer,
   videocall: videocallReducer,
   appsettings: appsettingsReducer
});
