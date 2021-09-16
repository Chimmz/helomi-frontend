export function saveUserInStorage(user) {
   localStorage.setItem('HELOMI_USER', JSON.stringify(user));
}

export function saveTokenInStorage(token) {
   localStorage.setItem('HELOMI_USER_TOKEN', JSON.stringify(token));
}

export function getUserInStorage() {
   try {
      const user = JSON.parse(localStorage.setItem('HELOMI_USER'));
      return user;
   } catch (_) {
      return null;
   }
}

export function getTokenInStorage() {
   try {
      const token = JSON.parse(localStorage.getItem('HELOMI_USER_TOKEN'));
      return token;
   } catch (_) {
      return null;
   }
}
