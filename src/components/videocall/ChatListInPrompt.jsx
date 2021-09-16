import React from 'react';
import './ChatListInPrompt.scss';

function ChatListInPrompt() {
   return (
      <ul className="user-chatlist remove-bullets">
         <li className="each-row">
            <input type="checkbox" id="add-chat" />
            <label htmlFor="add-chat">
               <div className="chat">
                  <img
                     src="img/face3.jpg"
                     alt=""
                     className="chat__photo pic pic--sm"
                  />
                  <span className="chat__name">Mary Branson</span>
               </div>
            </label>
         </li>
      </ul>
   );
}

export default ChatListInPrompt;
