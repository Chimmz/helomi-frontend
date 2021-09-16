import React, { useState, useContext } from 'react';
import { withRouter, useParams, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import {
   selectUser,
   selectCurrentUser
} from '../../../redux/user/user.selectors';
import { startVideoCall } from '../../../redux/videocall/videocall.action.creators';
import { selectCurrentChat } from '../../../redux/chat/chat.selectors';
import { deleteChat } from '../../../redux/chat/chat.action.creators';

import { themeContext } from '../../../contexts/ThemeProvider';
import { useToggle } from '../../../hooks/useToggle';
import Dropdown from '../../formUI/Dropdown';
import Overlay from '../../UI/Overlay';

import './Chat-header.scss';
import '../../Icon.scss';

// 'user' is not in use for now
function ChatHeader({ user, currentChat, currentUser, dispatch }) {
   const currentChatId = useParams().id;
   const [chatPhotoZoomedIn, setChatPhotoZoomedIn] = useState(false);
   const [optionsShown, setOptionsShown, toggleOptionsShown] = useToggle(false);
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   const handleClickOverlay = () => {
      setChatPhotoZoomedIn(false);
      setOptionsShown(false);
   };

   return (
      <div className={`chatting-section__header ${darkTheme && 'd-theme'}`}>
         <div className='chatting-section__header__userdetails'>
            <div
               className={`chatting-section__header__userphoto chatting-section__header__userphoto--${
                  chatPhotoZoomedIn ? 'zoomed-in' : 'zoomed-out'
               }`}>
               <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/users/${currentChat.photo}`}
                  alt=''
                  className='user-img pic pic--sm'
                  onClick={() => setChatPhotoZoomedIn(true)}
               />
            </div>
            <span className='chatting-section__header__username'>
               {currentChat.username}
            </span>
         </div>
         <div
            className={`chatting-section__header__nav ${
               darkTheme && 'd-theme'
            }`}>
            {/* <i
               className="fas fa-phone-alt with-label with-label-at-bottom"
               data-label="Start audio call"
            ></i> */}
            <i
               className='fas fa-video with-label with-label-at-bottom'
               data-label='Start video call'
               onClick={() =>
                  dispatch(startVideoCall(currentUser._id, currentChatId))
               }></i>
            {/* </Link> */}
            {/* <div className='chatting-section__header__nav__options'>
               <i
                  className='fas fa-ellipsis-v chatting-section__header__nav__options-icon'
                  onClick={toggleOptionsShown}></i>
               <Dropdown
                  className='chatting-section__header__nav__options__dropdown'
                  showIf={false}
                  children={
                     <li
                        className='chatting-section__header__nav__options__item'
                        onClick={() =>
                           dispatch(deleteChat(user.token, currentChatId))
                        }>
                        Delete friend
                     </li>
                  }
               />
            </div> */}
         </div>
         <Overlay
            showIf={chatPhotoZoomedIn || optionsShown}
            onClick={handleClickOverlay}
            transparent={optionsShown}
         />
      </div>
   );
}
const mapStateToProps = (state, ownProps) => ({
   user: selectUser(state),
   currentUser: selectCurrentUser(state),
   currentChat: selectCurrentChat(ownProps.match.params.id)(state)
});
export default withRouter(connect(mapStateToProps)(ChatHeader));
