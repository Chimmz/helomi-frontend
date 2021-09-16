import React from 'react';
import './AllParticpantsInCall.scss';

function AllParticpantsInCall(props) {
   return (
      <div className="videocall__call__allparticipants">{props.children}</div>
   );
}

export default AllParticpantsInCall;
