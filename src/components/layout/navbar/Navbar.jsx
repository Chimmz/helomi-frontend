import React, { useContext, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../redux/user/user.selectors';

import { themeContext } from '../../../contexts/ThemeProvider';

import NavbarSearch from './NavbarSearch';
import Myprofile from './Myprofile';
import RateReviewIcon from '@material-ui/icons/RateReview';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ThemeToggler from './ThemeToggler';

import './Navbar.scss';

function Navbar({ user }) {
   const { isLoggedIn } = user;
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   const authlinks = [
      {
         label: 'Posts',
         icon: (
            <RateReviewIcon
               className='navbar__link__icon'
               style={{ fontSize: '2rem' }}
            />
         )
      },
      {
         label: 'My profile',
         icon: (
            <PersonIcon
               className='navbar__link__icon'
               style={{ fontSize: '2.2rem' }}
            />
         )
      },
      {
         label: 'Settings',
         icon: (
            <SettingsIcon
               className='navbar__link__icon'
               style={{ fontSize: '2rem' }}
            />
         )
      }
   ];
   return (
      <nav className={`navbar ${darkTheme && 'd-theme'}`}>
         <Link to='/dashboard' className='navbar__logo'>
            helomi
         </Link>

         {isLoggedIn && <NavbarSearch />}
         {isLoggedIn && <Myprofile />}
         <ThemeToggler />

         {/* <div className="navbar__links remove-bullets">
            {user.isLoggedIn &&
               authlinks.map(({ label, icon }) => (
                  <NavLink
                     key={label}
                     to={`/${label.toLowerCase().split(' ').join('-')}`}
                     className="navbar__link"
                     activeClassName="navbar__link--active"
                  >
                     {icon}
                     <span className="navbar__link__label">{label}</span>
                  </NavLink>
               ))}
         </div> */}
      </nav>
   );
}
const mapStateToProps = createStructuredSelector({
   user: selectUser
});
export default connect(mapStateToProps)(Navbar);
