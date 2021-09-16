import React, { useState, useContext, useEffect, useRef } from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { selectCurrentUser } from '../../../redux/user/user.selectors';

function LocalPeer({ stream, callConnected }) {
   const localVideoRef = useRef();

   useEffect(() => {
      if (stream) localVideoRef.current.srcObject = stream;
   }, []);

   return (
      <div
         className={`videocall__participant videocall__participant--user ${
            callConnected
               ? 'videocall__participant--user-send-to-bottom-right'
               : 'videocall__participant--user-fullwidth'
         }`}
      >
         {stream && (
            <video
               src=""
               autoPlay
               muted
               className="videocall__participant__video"
               ref={localVideoRef}
               // srcObject={stream}
            ></video>
         )}
      </div>
   );
}

export default LocalPeer;
