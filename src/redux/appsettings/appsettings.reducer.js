import { TOGGLE_APP_THEME } from './appsettings.actions';
import {
   reverseTheme,
   getSavedSettings,
   saveSettings
} from './appsettings.utils';

const initState = {
   theme: getSavedSettings()?.theme || 'light'
};

export default function (state = initState, action) {
   switch (action.type) {
      case TOGGLE_APP_THEME:
         const newTheme = reverseTheme(state.theme);

         saveSettings({ ...state, theme: newTheme });
         return { theme: newTheme };
      default:
         return state;
   }
}
