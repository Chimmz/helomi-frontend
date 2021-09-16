import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAllMsgs } from '../../../../redux/msg/msg.selectors';
import { selectCurrentUser } from '../../../../redux/user/user.selectors';

import { themeContext } from '../../../../contexts/ThemeProvider';
import { getMsgSentTime } from '../../../../redux/msg/msg.utils';
import './Chat.scss';

function Chat({ chat, allReduxMsgs, currentUser }) {
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';
   const lastChatMsg = allReduxMsgs[chat._id]?.slice(-1).pop() || '';

   const showLastMsgAsUnread =
      currentUser.id !== lastChatMsg.sender && !lastChatMsg.isRead;

   const unreadMsgsCount =
      allReduxMsgs[chat._id]?.reduce((accum, msg) => {
         return msg.sender === chat._id && !msg.isRead ? accum + 1 : accum + 0;
      }, 0) || '';

   return (
      <NavLink
         to={`/dashboard/chats/${chat._id}`}
         className={`chat chat--has-unread-messages ${
            darkTheme ? 'd-theme' : ''
         }`}
         activeClassName='chat--active'>
         <img
            src={`${process.env.REACT_APP_BACKEND_URL}/users/${chat.photo}`}
            alt=''
            className='chat__photo pic pic--sm'
         />
         <div className='chat__info '>
            <span className='chat__name'>{chat.username}</span>
            {chat.isTyping ? (
               <span className='chat__is-typing'>typing...</span>
            ) : (
               <span
                  className={`chat__lastmessage chat__lastmessage--${
                     showLastMsgAsUnread && 'unread'
                  }`}>
                  {lastChatMsg.text}
               </span>
            )}
            {unreadMsgsCount && (
               <span className='unread-messages-count'>{unreadMsgsCount}</span>
            )}
         </div>
         <span className='chat__time'>2:35 PM</span>
      </NavLink>
   );
}

const mapState = createStructuredSelector({
   allReduxMsgs: selectAllMsgs,
   currentUser: selectCurrentUser
});
export default connect(mapState)(Chat);
