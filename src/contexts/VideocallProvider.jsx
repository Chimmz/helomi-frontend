import React, { useState, createContext } from 'react';

export const videoCallContext = createContext();

export const VideoCallProvider = props => {
   const [videoCallSession, setVideoCallSession] = useState({
      roomId: null,
      caller: null,
      offer: null,
      answer: null,
      msgs: []
   });
   return (
      <videoCallContext.Provider
         value={{ session: videoCallSession, setSession: setVideoCallSession }}
      >
         {props.children}
      </videoCallContext.Provider>
   );
};
