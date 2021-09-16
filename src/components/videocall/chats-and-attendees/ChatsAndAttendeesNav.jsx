import React, { useContext } from 'react';
import { themeContext } from '../../../contexts/ThemeProvider';
import './ChatsAndAttendeesNav.scss';

function ChatsAndAttendeesNav(props) {
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';
   const { isViewingAttendees, setIsViewingAttendees } = props;

   return (
      <div
         className={`videocall__chats-and-attendees-nav ${
            darkTheme && 'd-theme'
         }`}
      >
         <span
            className={`chats ${!isViewingAttendees && 'nav-item--active'}`}
            data-nav-item="chat-msgs"
            onClick={() => setIsViewingAttendees(false)}
         >
            <i className="fas fa-comments"></i>
         </span>
         {/* <div
            className={`attendees ${isViewingAttendees && 'nav-item--active'}`}
            data-nav-item="attendees"
            onClick={() => setIsViewingAttendees(true)}
         >
            <span className="total">15</span>
            <i className="fas fa-users"></i>
         </div> */}
      </div>
   );
}

export default ChatsAndAttendeesNav;
