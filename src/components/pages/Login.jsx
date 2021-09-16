import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alerts from '../alerts/Alerts';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';
import { selectAllAlerts } from '../../redux/alert/alert.selectors';
import { authenticate } from '../../redux/user/user.actions.creators';

import { themeContext } from '../../contexts/ThemeProvider';
import * as otherUtils from '../../utils/others';

import * as formUtils from '../../utils/forms';
import TextInput from '../formUI/TextInput';
import LoadingSpinner from '../UI/Loader';
import './Login-Signup.scss';

function Login({ user, alerts, dispatch }) {
   const [loginData, setLoginData] = useState({ username: '', password: '' });
   const [showSpinner, setShowSpinner] = useState(false);
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   const onChangeData = ev => {
      const { name, value } = ev.target;
      setLoginData({ ...loginData, [name]: value });
   };
   const handleSubmit = ev => {
      ev.preventDefault();
      const emptyFields = otherUtils.getEmptyFields(loginData);

      if (emptyFields.length)
         return formUtils.flashAlertsForEmptyFields(emptyFields, dispatch);

      dispatch(authenticate('login', loginData));
   };
   return user.isLoggedIn ? (
      <Redirect to='/dashboard' />
   ) : (
      <>
         <Alerts alerts={alerts} />
         <form
            action=''
            className={`auth u-text-center ${darkTheme && 'd-theme'}`}
            onSubmit={handleSubmit}
         >
            <h1 className='heading-primary auth__heading'>Log in</h1>
            <div className='auth__formgroup'>
               <TextInput
                  type='text'
                  className='auth__forminput textfield'
                  placeholder='Enter your username'
                  name='username'
                  value={loginData.username}
                  onChange={onChangeData}
               />
               <i className='fas fa-user auth__formgroup__icon'></i>
            </div>
            <div className='auth__formgroup'>
               <TextInput
                  type='password'
                  className='auth__forminput textfield'
                  placeholder='Enter your password'
                  name='password'
                  value={loginData.password}
                  onChange={onChangeData}
               />
               <i className='fas fa-lock auth__formgroup__icon'></i>
            </div>
            <div className='auth__formgroup'>
               <button type='submit' className='btn btn--curved auth__submit'>
                  Log into my account
               </button>
            </div>

            <p className='auth__switch-auth-page'>
               Don't have an account?{' '}
               <Link to='/signup'>Create a new account</Link>
            </p>
         </form>
      </>
   );
}
const mapStateToProps = createStructuredSelector({
   user: selectUser,
   alerts: selectAllAlerts
});

export default connect(mapStateToProps)(Login);
