import React, { useState, useContext } from 'react';

import { themeContext } from '../../../contexts/ThemeProvider';
import ChatsAndAttendeesNav from './ChatsAndAttendeesNav';
import MsgSection from './Msg-section';
import Attendees from './Attendees';
import './ChatsAndAttendees.scss';

function ChatsAndAttendees() {
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';
   const [isViewingAttendees, setIsViewingAttendees] = useState(false);

   return (
      <div
         className={`videocall__chats-and-attendees ${darkTheme && 'd-theme'}`}
      >
         <h1 className="heading">Group Chat</h1>
         {isViewingAttendees ? <Attendees /> : <MsgSection />}

         <ChatsAndAttendeesNav
            isViewingAttendees={isViewingAttendees}
            setIsViewingAttendees={setIsViewingAttendees}
         />
      </div>
   );
}

export default ChatsAndAttendees;
