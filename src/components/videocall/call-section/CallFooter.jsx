import React from 'react';

import './CallFooter.scss';
import CallOptions from './CallOptions';
import CallControls from './CallControls';
import CallMoreOptions from './CallMoreOptions';

function CallFooter() {
   return (
      <div className="videocall__call__footer">
         <CallOptions />
         <CallControls />
         <CallMoreOptions />
      </div>
   );
}

export default CallFooter;
