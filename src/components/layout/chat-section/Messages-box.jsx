import React, { useContext, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import ReactScrollableFeed from 'react-scrollable-feed';

import { connect } from 'react-redux';
import * as msgActions from '../../../redux/msg/msg.actions.creators';
// prettier-ignore
import { selectChatMsgs, selectUnreadMsgsSentByChat } from '../../../redux/msg/msg.selectors';
import { selectUser } from '../../../redux/user/user.selectors';
import { selectIsLoadingChatMsgs } from '../../../redux/chat/chat.selectors';

import { socketContext } from '../../../contexts/SocketProvider';
import { themeContext } from '../../../contexts/ThemeProvider';

import { v4 as uuidv4 } from 'uuid';
// import Textmsg from '../../textmsg/Textmsg';
import './Messages-box.scss';
import Textmsg from '../../Textmsg';

function MessagesBox(props) {
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';
   // prettier-ignore
   const { allMsgs, unreadMsgs, markMsgsAsRead, isLoadingChatMsgs, fetchChatMsgs, user } = props;
   const chatId = useParams().id;
   const { socket } = useContext(socketContext);

   // If any new message is sent by active chat, mark that message as seen since it is viewed immediately
   useEffect(() => {
      socket.on('new-msg-in', ({ newMsg, status }) => {
         if (newMsg.sender === chatId) {
            socket.emit('set-unreadMsgs-to-read', { unreadMsgs });
            markMsgsAsRead(newMsg._id, [chatId]);
         }
      });
   }, []);

   // Upon mounting, set any unseen msgs to seen
   useEffect(() => {
      if (isLoadingChatMsgs) fetchChatMsgs(user.token, chatId);
      if (!unreadMsgs?.length) return;

      socket.emit('set-unreadMsgs-to-read', { unreadMsgs });
      markMsgsAsRead(
         unreadMsgs.map(m => m._id),
         chatId
      );
   }, [chatId]);

   return (
      <ReactScrollableFeed>
         <div
            className={`chatting-section__messages-box ${
               darkTheme && 'd-theme'
            }`}>
            {allMsgs?.map(msg => (
               <Textmsg key={uuidv4() + msg._id} msg={msg} />
            ))}
         </div>
      </ReactScrollableFeed>
   );
}

const mapStateToProps = (state, ownProps) => ({
   user: selectUser(state),
   allMsgs: selectChatMsgs(ownProps.match.params.id)(state),
   unreadMsgs: selectUnreadMsgsSentByChat(ownProps.match.params.id)(state),
   isLoadingChatMsgs: selectIsLoadingChatMsgs(ownProps.match.params.id)(state)
});

const mapDispatchToProps = dispatch => ({
   fetchChatMsgs: (token, chatId) =>
      dispatch(msgActions.fetchChatMsgs(token, chatId)),
   markMsgsAsRead: (msgIds, chatId) =>
      dispatch(msgActions.markMsgsAsRead(msgIds, chatId))
});

export default withRouter(
   connect(mapStateToProps, mapDispatchToProps)(React.memo(MessagesBox))
);
