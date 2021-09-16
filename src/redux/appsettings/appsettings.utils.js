export const reverseTheme = theme => (theme === 'light' ? 'dark' : 'light');

export const getSavedSettings = () => {
   try {
      const savedSettings = JSON.parse(
         localStorage.getItem('HELOMI_APP_SETTINGS')
      );
      return savedSettings;
   } catch (_) {
      return { theme: 'light' };
   }
};

export const saveSettings = settings =>
   localStorage.setItem('HELOMI_APP_SETTINGS', JSON.stringify(settings));
