import { v4 as uuidv4 } from 'uuid';
import { flashAlert } from '../redux/alert/alert.action.creators';

export const flashAlertsForEmptyFields = function (fieldsArr, dispatch) {
   fieldsArr
      .map(field => ({
         text: `The "${field}" field cannot be empty`,
         type: 'warning',
         id: uuidv4()
      }))
      .forEach((alert, i) => dispatch(flashAlert(alert, 2000 * (i + 1))));
};
