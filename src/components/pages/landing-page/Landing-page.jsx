import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../redux/user/user.selectors';

import { Link } from 'react-router-dom';
import { themeContext } from '../../../contexts/ThemeProvider';
import './Landing-page.scss';

const LandingPage = ({ user }) => {
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   return user.isLoggedIn ? (
      <Redirect to='/dashboard' />
   ) : (
      <div className='home'>
         <header className='home__header'>
            <div className='home__header__textbox'>
               <h1 className='h-1 home__header__heading u-mgb-sm'>
                  Enjoy the moments of communication.
               </h1>
               <p className='parag u-mgb-lg'>
                  Helomi is a desktop web-based chat application for making
                  memorable communication experiences.
               </p>
               <Link to='/signup' className='btn btn-black btn-lg btn--rounded'>
                  Get started
               </Link>
            </div>
            <picture className='home__header__picture'>
               <img
                  className='home__header__img'
                  src={process.env.PUBLIC_URL + '/img/hero.png'}
                  alt=''
               />
            </picture>
         </header>
         <section className={`home__services ${darkTheme && 'd-theme'}`}>
            <div className={`service ${darkTheme && 'd-theme'}`}>
               <span className='service__icon'>
                  <span
                     className=' iconify'
                     data-icon='ion:chatbox-ellipses'></span>
               </span>

               <div className='service__textbox'>
                  <h4 className='h-4 u-text-center'>Instant messaging</h4>
                  <p className='parag u-text-center'>
                     Send text messages at real time to your friends and loved
                     ones for free anytime, anywhere.
                  </p>
               </div>
            </div>
            <div className={`service ${darkTheme && 'd-theme'}`}>
               <span className='service__icon'>
                  <span className=' iconify' data-icon='ion:videocam'></span>
               </span>

               <div className='service__textbox'>
                  <h4 className='h-4 u-text-center'>Video calling</h4>
                  <p className='parag u-text-center'>
                     Communicate with anyone through a real-time video streaming
                     for free.
                  </p>
               </div>
            </div>
         </section>
         <footer className={`footer ${darkTheme && 'd-theme'}`}>
            <Link to='/' className='navbar__logo'>
               helomi
            </Link>
            <span className='footer__copyr'>
               Helomi. © Copyright 2021. All rights reserved.
            </span>
            <span className='footer__designedby'>
               Designed and powered by Chima Orji Divine.
            </span>
         </footer>
      </div>
   );
};

const mapStateToProps = createStructuredSelector({
   user: selectUser
});

export default connect(mapStateToProps)(LandingPage);
