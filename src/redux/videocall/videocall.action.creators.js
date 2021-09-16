import {
   RING,
   STOP_RINGING,
   START_CALL,
   SET_RTC_OFFER,
   SET_RTC_ANSWER,
   ACCEPT_CALL,
   SET_IS_ADDING_NEW_PEER_TO_CALL
} from './videocall.action.types';

import { getVideoChatRoomId } from './videocall.utils.js';

// For outgoing
export const setRtcAnswer = answer => ({
   type: SET_RTC_ANSWER,
   payload: { answer }
});

export const startVideoCall = (userId, callingWho) => ({
   type: START_CALL,
   payload: { caller: userId, callingWho, roomId: getVideoChatRoomId(userId) }
});

// For incoming
export const ring = (caller, roomId, offer) => dispatch => {
   dispatch({ type: SET_RTC_OFFER, payload: { offer } });
   dispatch({ type: RING, payload: { caller, roomId } });
};

export const acceptCall = () => dispatch => {
   dispatch({ type: STOP_RINGING });
   dispatch({ type: ACCEPT_CALL });
};

// For general
export const setIsAddingNewPeerToCall = boolVal => ({
   type: SET_IS_ADDING_NEW_PEER_TO_CALL,
   payload: { boolVal }
});
