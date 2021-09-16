import React from 'react';
import { connect } from 'react-redux';
import * as alertActions from '../../redux/alert/alert.action.creators';

function Alert({ id, type, text, removeAlert }) {
   return (
      <div className={`alert alert--${type} alert--alignleft`}>
         <p>{text}</p>
         <span className=' alert__remove' onClick={() => removeAlert(id)}>
            &times;
         </span>
      </div>
   );
}

const mapDispatchToProps = dispatch => ({
   removeAlert: id => dispatch(alertActions.removeAlert(id))
});
export default connect(null, mapDispatchToProps)(Alert);
