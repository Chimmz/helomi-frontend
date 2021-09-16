import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/user/user.selectors';
import { authenticate } from '../../redux/user/user.actions.creators';
import { themeContext } from '../../contexts/ThemeProvider';
import * as otherUtils from '../../utils/others';
import * as formUtils from '../../utils/forms';
import TextInput from '../formUI/TextInput';
import './Login-Signup.scss';

function Signup({ user, dispatch }) {
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';
   const [signupData, setSignupData] = useState({
      username: '',
      password: '',
      email: ''
   });

   const onChangeData = ev => {
      const { name, value } = ev.target;
      setSignupData({ ...signupData, [name]: value });
   };

   const handleSubmit = ev => {
      ev.preventDefault();
      const emptyFields = otherUtils.getEmptyFields(signupData);

      if (emptyFields.length)
         return formUtils.flashAlertsForEmptyFields(emptyFields, dispatch);
      dispatch(authenticate('signup', signupData));
   };

   return user.isLoggedIn ? (
      <Redirect to='/dashboard' />
   ) : (
      <form
         className={`auth u-text-center ${darkTheme && 'd-theme'}`}
         onSubmit={handleSubmit}
      >
         <h1 className='heading-primary auth__heading'>
            Create your new account
         </h1>
         <div className='auth__formgroup'>
            <TextInput
               type='text'
               className='auth__forminput textfield'
               placeholder='Enter your username'
               name='username'
               value={signupData.username}
               onChange={onChangeData}
            />
            <i className='fas fa-user auth__formgroup__icon'></i>
         </div>
         <div className='auth__formgroup'>
            <TextInput
               type='email'
               className='auth__forminput textfield'
               placeholder='Enter your email'
               name='email'
               value={signupData.email}
               onChange={onChangeData}
            />
            <i className='fas fa-envelope auth__formgroup__icon'></i>
         </div>
         <div className='auth__formgroup'>
            <TextInput
               type='password'
               className='auth__forminput textfield'
               placeholder='Enter a password'
               name='password'
               value={signupData.password}
               onChange={onChangeData}
               autoComplete='off'
            />
            <i className='fas fa-lock auth__formgroup__icon'></i>
         </div>
         <div className='auth__formgroup'>
            <button type='submit' className='btn btn--curved auth__submit'>
               Create my new account
            </button>
         </div>
         <p className='auth__switch-auth-page'>
            Already have an account? <Link to='/login'>Log in</Link>
         </p>
      </form>
   );
}

const mapStateToProps = createStructuredSelector({ user: selectUser });
export default connect(mapStateToProps)(Signup);
