import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';

import './VideocallMsg.scss';
import '../../Textmsg.scss';

function VideocallMsg({ msg, currentUser }) {
   console.log('In VideocallMsg, ', msg.sender._id, currentUser);
   const { text, sender } = msg;
   const sentByMe = sender._id === currentUser._id;

   return (
      <div
         className={`videocall-msg textmsg--${
            sentByMe ? 'outgoing' : 'incoming'
         }`}>
         <img
            src={`${process.env.REACT_APP_BACKEND_URL}/users/${sender.photo}`}
            alt=''
            className='videocall-msg__sender-photo pic pic--xsm'
         />
         <div className='videocall-msg__sender-name'>
            {sentByMe ? 'You' : sender.username}
         </div>
         <p className='videocall-msg__content'>{text}</p>
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(VideocallMsg);
