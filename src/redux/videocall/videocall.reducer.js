import * as videocallActions from './videocall.action.types';

const initState = {
   call: {
      caller: null,
      callingWho: null,
      roomId: null,
      offer: null,
      answer: null,
      candidate: null,
      chatMsgs: [],
      isMuted: true,
      videoStopped: false,
      isConnected: false,
      callEnded: true
   },
   isRinging: false,
   isOnCall: false,
   isFullscreen: false,
   isAddingNewPeerToCall: false
};

const videocallReducer = function (state = initState, action) {
   const { type, payload } = action;
   switch (type) {
      case videocallActions.RING:
         const { caller, roomId } = payload;
         return {
            ...state,
            call: { ...state.call, caller, roomId },
            isRinging: true
         };

      case videocallActions.CALL_CONNECTED:
         return { ...state, call: { ...state.call, isConnected: true } };

      case videocallActions.CALL_DISCONNECTED:
         return { ...state, call: { ...state.call, isConnected: false } };

      case videocallActions.STOP_RINGING:
         return { ...state, isRinging: false };

      case videocallActions.START_CALL:
         return {
            ...state,
            call: {
               ...state.call,
               caller: payload.caller,
               callingWho: payload.callingWho,
               roomId: payload.roomId
            },
            isOnCall: true
         };

      case videocallActions.SET_RTC_OFFER:
         return {
            ...state,
            call: { ...state.call, offer: payload.offer }
         };

      case videocallActions.SET_RTC_ANSWER:
         return {
            ...state,
            call: { ...state.call, answer: payload.answer }
         };

      case videocallActions.SET_RTC_CANDIDATE:
         return {
            ...state,
            call: { ...state.call, candidate: payload.candidate }
         };

      case videocallActions.ACCEPT_CALL:
         return { ...state, isOnCall: true };

      case videocallActions.ADD_VIDEOCALL_MSG:
         return {
            ...state,
            call: {
               ...state.call,
               chatMsgs: [...state.call.chatMsgs, payload.msg]
            }
         };

      case videocallActions.END_CALL:
         return {
            call: {
               caller: null,
               callingWho: null,
               roomId: null,
               offer: null,
               answer: null,
               candidate: null,
               chatMsgs: [],
               isMuted: true,
               videoStopped: false,
               isConnected: false,
               callEnded: true
            },
            isRinging: false,
            isOnCall: false,
            isFullscreen: false,
            isAddingNewPeerToCall: false
         };

      case videocallActions.ZOOM_TO_FULLSCREEN:
         return { ...state, isFullscreen: true };

      case videocallActions.EXIT_FULLSCREEN:
         return { ...state, isFullscreen: false };

      case videocallActions.SET_IS_ADDING_NEW_PEER_TO_CALL:
         return { ...state, isAddingNewPeerToCall: payload.boolVal };

      default:
         return state;
   }
};

export default videocallReducer;
