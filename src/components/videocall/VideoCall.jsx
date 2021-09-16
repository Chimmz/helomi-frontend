import React, { useEffect, useContext } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
   selectIsFullscreen,
   selectIsOnVideoCall,
   selectIsAddingToCall
} from '../../redux/videocall/videocall.selectors';
import { ADD_VIDEOCALL_MSG } from '../../redux/videocall/videocall.action.types';

import { socketContext } from '../../contexts/SocketProvider';
import { themeContext } from '../../contexts/ThemeProvider';
import { videoCallContext } from '../../contexts/VideocallProvider';
import { VideoCallProvider } from '../../contexts/VideocallProvider';

import AddToCallPrompt from './AddToCallPrompt';
import ChatsAndAttendees from './chats-and-attendees/ChatsAndAttendees';
import CallSection from './call-section/Call-section';
import Overlay from '../UI/Overlay';
import './VideoCall.scss';

function VideoCall({ chatId, dispatch, ...otherProps }) {
   const { isOnVideoCall, isAddingToCall, isFullscreen } = otherProps;
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   return (
      <VideoCallProvider>
         <div
            className={`videocall-modal ${
               isOnVideoCall && 'videocall-modal--zoomed-into-view'
            } ${isFullscreen && 'videocall-modal--fullscreen'} ${
               darkTheme && 'd-theme'
            }`}>
            <ChatsAndAttendees />
            <CallSection chatId={chatId} />
            {/* {isAddingToCall && <AddToCallPrompt />} */}
         </div>
         <Overlay showIf={isOnVideoCall} />
      </VideoCallProvider>
   );
}
const mapStateToProps = createStructuredSelector({
   isOnVideoCall: selectIsOnVideoCall,
   isFullscreen: selectIsFullscreen,
   isAddingToCall: selectIsAddingToCall
});
export default connect(mapStateToProps)(VideoCall);
