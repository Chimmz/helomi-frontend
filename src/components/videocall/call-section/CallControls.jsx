import React, { useContext } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { selectVideoChatRoomId } from '../../../redux/videocall/videocall.selectors';
import {
   END_CALL,
   RESET_VIDEOCALL_STATE
} from '../../../redux/videocall/videocall.action.types';
import { socketContext } from '../../../contexts/SocketProvider';
import { themeContext } from '../../../contexts/ThemeProvider';

import { useToggle } from '../../../hooks/useToggle';
import './CallControls.scss';

function CallControls({ videoChatRoom, currentUser, dispatch }) {
   const { socket } = useContext(socketContext);
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   const [micOn, _, toggleMic] = useToggle(false);
   const [videoOn, __, toggleVideo] = useToggle(true);
   const [speakerOn, ___, toggleSpeaker] = useToggle(true);

   const handleClickEndCall = () => {
      socket.emit('click-end-call-btn', currentUser._id);
      socket.emit('leave-call', videoChatRoom);
      dispatch({ type: END_CALL });
   };

   return (
      <div className={`videocall__call__controls ${darkTheme && 'd-theme'}`}>
         {/* <span
            className={`videocall__callcontrol with-label with-label-at-top videocall__callcontrol ${
               !micOn && 'is-muted'
            }`}
            data-label={micOn ? 'Mute audio' : 'Unmute audio'}
            onClick={toggleMic}
         >
            <i className="fas fa-microphone"></i>
         </span>
         <span
            className={`videocall__callcontrol with-label with-label-at-top ${
               !videoOn && 'is-muted'
            }`}
            data-label={videoOn ? 'Stop video' : 'Start video'}
            onClick={toggleVideo}
         >
            <i className="fas fa-video"></i>
         </span>
         <span
            className={`videocall__callcontrol with-label with-label-at-top ${
               !speakerOn && 'is-muted'
            }`}
            data-label={speakerOn ? 'Mute speaker' : 'Unmute speaker'}
            onClick={toggleSpeaker}
         >
            <i className="fas fa-volume-up"></i>
         </span> */}
         <span
            className='videocall__callcontrol with-label with-label-at-top'
            data-label='End call'
            onClick={handleClickEndCall}>
            <i className='fas fa-phone' data-label='End call'></i>
         </span>
      </div>
   );
}
const mapStateToProps = createStructuredSelector({
   videoChatRoom: selectVideoChatRoomId,
   currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(CallControls);
