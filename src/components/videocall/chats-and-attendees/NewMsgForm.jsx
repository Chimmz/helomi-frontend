import React, { useState, useContext } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectVideoChatRoomId } from '../../../redux/videocall/videocall.selectors';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { ADD_VIDEOCALL_MSG } from '../../../redux/videocall/videocall.action.types';

import { socketContext } from '../../../contexts/SocketProvider';
import '../../Icon.scss';
import './NewMsgForm.scss';
import { themeContext } from '../../../contexts/ThemeProvider';

function NewMsgForm({ currentUser, videoChatRoom, dispatch }) {
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';
   const { socket } = useContext(socketContext);
   const [newTextMsg, setNewTextMsg] = useState('');

   const handleChange = ev => setNewTextMsg(ev.target.value);

   const sendNewMsg = function (ev) {
      ev?.preventDefault();

      const msg = {
         text: newTextMsg,
         sender: currentUser,
         room: videoChatRoom
      };
      dispatch({ type: ADD_VIDEOCALL_MSG, payload: { msg } });
      socket.emit('send-video-call-msg', msg);

      setNewTextMsg('');
   };

   return (
      <form
         className={`newmsg ${darkTheme && 'd-theme'}`}
         onSubmit={sendNewMsg}>
         <input
            type='text'
            value={newTextMsg}
            className='newmsg__input'
            onChange={handleChange}
            placeholder='Type a new message here'
         />
         <span
            className='newmsg__send icon icon--sm icon--bg-blue'
            onClick={sendNewMsg}>
            <i className='fas fa-paper-plane'></i>
         </span>
      </form>
   );
}
const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   videoChatRoom: selectVideoChatRoomId
});
export default connect(mapStateToProps, null)(NewMsgForm);
