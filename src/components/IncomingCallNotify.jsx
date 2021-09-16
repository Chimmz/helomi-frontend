import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { socketContext } from '../contexts/SocketProvider';
import { selectCallerInChat } from '../redux/chat/chat.selectors';
import { acceptCall } from '../redux/videocall/videocall.action.creators';
import {
   ACCEPT_CALL,
   STOP_RINGING
} from '../redux/videocall/videocall.action.types';
import {
   selectRtcOffer,
   selectCaller,
   selectVideoChatRoomId
} from '../redux/videocall/videocall.selectors';

import './IncomingCallNotify.scss';

function IncomingCallNotify({ callerInChat, dispatch }) {
   const callerUsername = callerInChat?.username;

   const acceptCall = () => {
      dispatch({ type: STOP_RINGING });
      dispatch({ type: ACCEPT_CALL });
   };

   return (
      <div className="callnotify">
         <i className="fas fa-phone-volume callnotify__icon"></i>
         <h1 className="callnotify__name">{callerUsername || '(Unknown)'}</h1>
         <p className="callnotify__msg">Incoming call</p>
         <div className="callnotify__user-actions">
            <button
               className="btn btn-md callnotify__user-action btn-red"
               onClick={() => dispatch({ type: STOP_RINGING })}
            >
               Decline
            </button>
            <button
               className="btn btn-md callnotify__user-action btn-green"
               onClick={acceptCall}
            >
               Accept
            </button>
         </div>
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   rtcOffer: selectRtcOffer,
   callerInChat: selectCallerInChat,
   videocallRoomId: selectVideoChatRoomId
});

export default connect(mapStateToProps)(IncomingCallNotify);
