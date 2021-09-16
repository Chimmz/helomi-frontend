import React, { useState, useContext, useEffect, useRef } from 'react';

function RemotePeer({ stream }) {
   const remoteVideoRef = useRef();

   useEffect(() => {
      remoteVideoRef.current.srcObject = stream;
   }, []);

   return (
      <div className="videocall__participant videocall__participant--peer">
         {stream && (
            <video
               src=""
               autoPlay
               className="videocall__participant__video"
               ref={remoteVideoRef}
            ></video>
         )}
      </div>
   );
}

export default RemotePeer;
