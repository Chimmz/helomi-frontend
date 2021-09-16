import React, { useState, useContext } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addUserAsFriend } from '../../../redux/chat/chat.action.creators';
import {
   selectUser,
   selectCurrentUser
} from '../../../redux/user/user.selectors';

import { themeContext } from '../../../contexts/ThemeProvider';

import { API } from '../../../utils/api';
import Overlay from '../../UI/Overlay';

import './NavbarSearch.scss';

function NavbarSearch({ user, currentUser, dispatch }) {
   const authToken = user.token;
   const [searchQuery, setSearchQuery] = useState('');
   const [searchResults, setSearchResults] = useState([]);
   const [suggestionsShown, setSuggestionsShown] = useState(false);
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   const searchPeople = async function (query) {
      try {
         const response = await API.searchPeople(authToken, query);
         console.log(response.users);
         setSearchResults(response.users);

         if (response.users.length) setSuggestionsShown(true);
      } catch (err) {
         alert('Sorry omething went wrong. Check your internet connection');
      }
   };

   const handleChange = ev => {
      const { value } = ev.target;
      setSearchQuery(value);

      if (!value) setSearchResults([]);
      else searchPeople(value);
   };
   const handleFocus = ev => {
      if (!searchResults) return;
      searchResults.length && setSuggestionsShown(true);
   };

   const handleClickAddBtn = userId => {
      dispatch(addUserAsFriend(authToken, userId));
      setSuggestionsShown(false);
   };

   return (
      <div className='navbar__search'>
         <input
            type='text'
            className={`navbar__search__input navbar__search__input--${
               suggestionsShown && 'suggestions-shown'
            } ${darkTheme && 'd-theme'}`}
            placeholder='Search people'
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
         />
         {suggestionsShown && (
            <div
               className={`navbar__search__suggestions ${
                  darkTheme && 'd-theme'
               }`}>
               {searchResults.map(user => (
                  <div
                     className={`navbar__search__suggestion ${
                        darkTheme && 'd-theme'
                     }`}
                     key={user._id}>
                     <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/users/${user.photo}`}
                        alt=''
                        className='navbar__search__suggestion__photo pic pic--sm'
                     />
                     <div className='navbar__search__suggestion__user-info'>
                        <span className='navbar__search__suggestion__username'>
                           {user.username}{' '}
                           <span className='navbar__search__suggestion__email'>
                              {user.email}
                           </span>
                        </span>
                        {/* <span className="navbar__search-suggestion__mutual-friends">
                           3 mutual friends
                        </span> */}
                     </div>
                     <button
                        className='btn btn-md btn-primary'
                        onClick={() => handleClickAddBtn(user._id)}>
                        Add friend
                     </button>
                  </div>
               ))}
            </div>
         )}
         <Overlay
            showIf={suggestionsShown}
            transparent
            onClick={() => {
               setSuggestionsShown(false);
            }}
         />
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   user: selectUser,
   currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(NavbarSearch);
