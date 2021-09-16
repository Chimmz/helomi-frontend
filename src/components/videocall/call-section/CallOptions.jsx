import React from 'react';

import { connect } from 'react-redux';
import { setIsAddingNewPeerToCall } from '../../../redux/videocall/videocall.action.creators';

import './CallOptions.scss';

function CallOptions({ dispatch }) {
   const displayAddToCallPrompt = () =>
      dispatch(setIsAddingNewPeerToCall(true));
   return (
      <div
         className='videocall__call__options'
         onClick={displayAddToCallPrompt}>
         {/* <span
            className="videocall__call__option with-label with-label-at-top"
            data-label="Add new participant"
         >
            <i className="fas fa-user-plus"></i>
         </span> */}
      </div>
   );
}

// const mapDispatchToProps = dispatch => ({

// })
export default connect()(CallOptions);
