import React from 'react';
import './Alerts.scss';
import Alert from './Alert';

function Alerts({ alerts }) {
   return (
      <div className="alerts">
         {alerts.map(alert => (
            <Alert key={alert.id} {...alert} />
         ))}
      </div>
   );
}

export default Alerts;
