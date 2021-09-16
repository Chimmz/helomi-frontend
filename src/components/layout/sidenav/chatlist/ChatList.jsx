import React, { useContext, useEffect } from 'react';
import SyncClient from 'twilio-sync';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectChats } from '../../../../redux/chat/chat.selectors';
import {
   selectUser,
   selectCurrentUser
} from '../../../../redux/user/user.selectors';

import { socketContext } from '../../../../contexts/SocketProvider';
import { themeContext } from '../../../../contexts/ThemeProvider';
import LoadingSpinner from '../../../UI/Loader';
import Chat from './Chat';
import './ChatList.scss';

function ChatList({ chats, user, currentUser }) {
   const { socket } = useContext(socketContext);
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   // useEffect(async () => {
   //    const syncClient = new SyncClient(user.twilioAccessToken);
   //    const SyncList = await syncClient.list('online-users');
   //    const localUser = await SyncList.push({ name: currentUser._id });
   //    console.log(syncClient, SyncList, localUser);
   // }, []);

   return chats.length ? (
      <div className={`allchats__chatlist ${darkTheme && 'd-theme'}`}>
         {chats.map(ch => (
            <Chat key={ch.id} chat={ch} />
         ))}
      </div>
   ) : (
      <LoadingSpinner />
   );
}

const mapStateToProps = createStructuredSelector({
   chats: selectChats,
   user: selectUser,
   currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(ChatList);
