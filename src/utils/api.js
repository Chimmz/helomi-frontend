const makeRequest = function ({ path, requestType, body, headers }) {
   const url = process.env.REACT_APP_BACKEND_URL + path;
   console.log('In makeReq', url);
   return fetch(url, { method: requestType, body, headers })
      .then(response => response.json())
      .catch(err => {
         console.log(err);
      });
};

class APIRequest {
   signup({ username, password, email }) {
      return makeRequest({
         path: '/users/signup',
         requestType: 'POST',
         body: JSON.stringify({ username, email, password }),
         headers: { 'Content-Type': 'application/json' }
      });
   }

   login({ username, password }) {
      return makeRequest({
         path: '/users/login',
         requestType: 'POST',
         body: JSON.stringify({ username, password }),
         headers: { 'Content-Type': 'application/json' }
      });
   }

   fetchChatMsgs(authToken, chatId) {
      return makeRequest({
         path: `/privatemsg/friends/${chatId}/msgs`,
         requestType: 'GET',
         body: JSON.stringify({ username, password }),
         headers: { 'Content-Type': 'application/json' }
      });
   }

   searchPeople(authToken, queryStr) {
      return makeRequest({
         path: `/friends/search-people?username=${queryStr}`,
         requestType: 'GET',
         headers: { Authorization: `Bearer ${authToken}` }
      });
   }

   addUserAsFriend(authToken, userId) {
      return makeRequest({
         path: `/friends/add/${userId}`,
         requestType: 'POST',
         headers: { Authorization: `Bearer ${authToken}` }
      });
   }

   deleteFriend(authToken, chatId) {
      return makeRequest({
         path: `/friends/${chatId}`,
         requestType: 'POST',
         headers: { Authorization: `Bearer ${authToken}` }
      });
   }

   updateUser(authToken, form) {
      return makeRequest({
         path: `/users/update-my-profile`,
         requestType: 'PATCH',
         headers: {
            Authorization: `Bearer ${authToken}`
         },
         body: form
      });
   }
   authenticateToken(authToken) {
      return makeRequest({
         path: `/users/auth`,
         requestType: 'GET',
         headers: { Authorization: `Bearer ${authToken}` }
      });
   }
}
export const API = new APIRequest();
