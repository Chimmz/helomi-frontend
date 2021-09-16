import React from 'react';
import './Attendees.scss';

function Attendees() {
   return (
      <ul className="videocall__attendees remove-bullets">
         <li className="videocall__attendee">
            <div className="videocall__attendee__details">
               <img
                  src="img/face2.jpg"
                  alt=""
                  className="videocall__attendee__pic pic pic--xsm"
               />
               <span className="videocall__attendee__name">Stella Brown</span>
            </div>
            <div className="host-actions">
               <button className="btn btn-md btn-primary">Unmute</button>
            </div>
            <div className="videocall__attendee__status-in-call">
               <span className="is-muted" data-label="Mute audio">
                  <i className="fas fa-microphone"></i>
               </span>
               <span className="is-muted" data-label="Stop video">
                  <i className="fas fa-video"></i>
               </span>
            </div>
         </li>
      </ul>
   );
}

export default Attendees;
