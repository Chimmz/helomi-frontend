import React, { useEffect, useContext } from 'react';
import SidenavSearch from './Sidenav-search';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { selectIsRinging } from '../../../redux/videocall/videocall.selectors';

import { socketContext } from '../../../contexts/SocketProvider';
import { themeContext } from '../../../contexts/ThemeProvider';

import ChatList from './chatlist/ChatList';
import './Sidenav.scss';
import IncomingCallNotify from '../../IncomingCallNotify';

function Sidenav({ currentUser, isRinging }) {
   const { socket } = useContext(socketContext);
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   useEffect(() => {
      socket.emit('join-self', currentUser._id);
   }, []);
   return (
      <div className={`allchats ${darkTheme && 'd-theme'}`}>
         <SidenavSearch />
         <ChatList />
         {isRinging && <IncomingCallNotify />}
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   isRinging: selectIsRinging
});
export default connect(mapStateToProps)(Sidenav);
