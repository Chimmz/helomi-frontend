import React from 'react';

import PeerToPeerCall from './PeerToPeerCall';
import ConferenceCall from './Conference-call';
import CallFooter from './CallFooter';
import './Call-section.scss';

function CallSection({ chatId }) {
   return (
      <div className="videocall__call videocall__call--peer-to-peer">
         <PeerToPeerCall chatId={chatId} />
         {/* <ConferenceCall /> */}
         <CallFooter />
      </div>
   );
}

export default CallSection;
