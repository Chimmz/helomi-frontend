import { ADD_ALERT, REMOVE_ALERT } from './alert.action.types';

const INITIAL_STATE = {
   alerts: []
};

const alertReducer = (state = INITIAL_STATE, { type, payload }) => {
   switch (type) {
      case ADD_ALERT:
         return { alerts: [payload.alert, ...state.alerts] };

      case REMOVE_ALERT:
         return {
            alerts: state.alerts.filter(alert => alert.id !== payload.id)
         };
      default:
         return state;
   }
};
export default alertReducer;
