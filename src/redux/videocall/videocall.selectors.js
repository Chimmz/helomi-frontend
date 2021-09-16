import { createSelector } from 'reselect';

const videocall = state => state.videocall;
const actualCall = state => state.videocall.call;

export const selectIsRinging = createSelector(
   [videocall],
   videocall => videocall.isRinging
);

export const selectCallConnected = createSelector(
   [actualCall],
   call => call.isConnected
);

export const selectIsOnVideoCall = createSelector(
   [videocall],
   videocall => videocall.isOnCall
);

export const selectRtcOffer = createSelector([actualCall], call => call.offer);

export const selectRtcAnswer = createSelector(
   [actualCall],
   call => call.answer
);

export const selectRtcCandidate = createSelector(
   [actualCall],
   call => call.candidate
);

export const selectCaller = createSelector([actualCall], call => call.caller);

export const selectCallingWho = createSelector(
   [actualCall],
   call => call.callingWho
);

export const selectCallAccepted = createSelector(
   [videocall],
   videocall => videocall.callAccepted
);

export const selectVideoChatMsgs = createSelector(
   [actualCall],
   call => call.chatMsgs
);

export const selectCallEnded = createSelector(
   [actualCall],
   call => call.callEnded
)

export const selectIsFullscreen = createSelector(
   [videocall],
   videocall => videocall.isFullscreen
);

export const selectIsAddingToCall = createSelector(
   [videocall],
   videocall => videocall.isAddingNewPeerToCall
);

export const selectVideoChatRoomId = createSelector(
   [actualCall],
   call => call.roomId
);
