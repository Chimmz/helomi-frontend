import React, { useContext } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
   selectUser,
   selectCurrentUser
} from '../../../redux/user/user.selectors';
import { selectTotalChatCount } from '../../../redux/chat/chat.selectors';
import {
   changeProfilePhoto,
   logOutUser
} from '../../../redux/user/user.actions.creators';

import { useToggle } from '../../../hooks/useToggle';
import { themeContext } from '../../../contexts/ThemeProvider';
import { API } from '../../../utils/api';
import './Myprofile.scss';

const Myprofile = function (props) {
   const {
      user,
      currentUser,
      changeProfilePhoto,
      totalChatCount,
      logOutUser
   } = props;

   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';
   const [showFullProfile, _, toggleShowFullProfile] = useToggle(false);

   const handleFileChosen = async function (ev) {
      const chosenFile = ev.target.files[0];
      const form = new FormData();
      form.append('photo', chosenFile);

      const res = await API.updateUser(user.token, form);
      changeProfilePhoto(res.user.photo);
   };

   return (
      <div className='navbar__myprofile'>
         <div
            className={`navbar__loggedin-user ${darkTheme && 'd-theme'}`}
            onClick={toggleShowFullProfile}>
            <img
               src={`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.photo}`}
               alt=''
               className='navbar__photo pic pic--sm'
            />
            <span className='navbar__username'>{currentUser.username}</span>
         </div>
         <div
            className={`navbar__myprofile__dropdown ${darkTheme && 'd-theme'} ${
               showFullProfile && 'navbar__myprofile__dropdown--slide-into-view'
            }`}>
            <picture className='navbar__myprofile__dropdown__picture'>
               <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.photo}`}
                  alt=''
                  className='navbar__myprofile__dropdown__picture__photo'
               />
               <form className='navbar__myprofile__dropdown__picture__form-upload'>
                  <input
                     type='file'
                     id='profile-photo'
                     accept='image/*'
                     onChange={handleFileChosen}
                  />
                  <label htmlFor='profile-photo'>Change photo</label>
                  {/* <i className="fas fa-camera"></i> */}
               </form>
            </picture>
            <div className='navbar__myprofile__dropdown__user-details'>
               <span className='navbar__myprofile__dropdown__username'>
                  {currentUser.username}
               </span>
               <span className='navbar__myprofile__dropdown__email'>
                  {currentUser.email}
               </span>
               <span className='navbar__myprofile__dropdown__friendscount'>
                  {totalChatCount}{' '}
                  {`${totalChatCount === 1 ? 'friend' : 'friends'}`}
               </span>
               {/* <span className="navbar__myprofile__dropdown__datejoined">
                  Joined Mar. 24
               </span> */}
            </div>
            <button
               className='btn btn-md btn-primary logout'
               onClick={logOutUser}>
               Log out
            </button>
         </div>
      </div>
   );
};

const mapStateToProps = createStructuredSelector({
   user: selectUser,
   currentUser: selectCurrentUser,
   totalChatCount: selectTotalChatCount
});

const mapDispatchToProps = dispatch => ({
   changeProfilePhoto: fileName => dispatch(changeProfilePhoto(fileName)),
   logOutUser: () => dispatch(logOutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(Myprofile);
