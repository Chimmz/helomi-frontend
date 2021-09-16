import React from 'react';
import { connect } from 'react-redux';
import { setIsAddingNewPeerToCall } from '../../redux/videocall/videocall.action.creators';
import ChatListInPrompt from './ChatListInPrompt';
import './AddToCallPrompt.scss';

function AddToCallPrompt({ hidePrompt }) {
   return (
      <div className="modal add-attendee-modal slide-in-from-up-to-center">
         <h1 className="add-attendee-modal__header">Add someone</h1>
         <ChatListInPrompt />
         <div className="add-attendee-modal__footer">
            <button className="btn btn-text-white">Close</button>
            <button className="btn btn-white">Add</button>
         </div>
         <span className="add-attendee-modal__close" onClick={hidePrompt}>
            &times;
         </span>
      </div>
   );
}
const mapDispatchToProps = dispatch => ({
   hidePrompt: () => dispatch(setIsAddingNewPeerToCall(false))
});
export default connect(null, mapDispatchToProps)(AddToCallPrompt);
