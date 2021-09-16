import React, { useEffect } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from './redux/user/user.selectors';
import { selectAllAlerts } from './redux/alert/alert.selectors';
import {
   selectCaller,
   selectIsOnVideoCall
} from './redux/videocall/videocall.selectors';
import { loadUser } from './redux/user/user.actions.creators';
import store from './redux/store';

import { SocketProvider } from './contexts/SocketProvider';
import ThemeProvider from './contexts/ThemeProvider';

import Navbar from './components/layout/navbar/Navbar';
import LandingPage from './components/pages/landing-page/Landing-page';
import ChattingSection from './components/layout/chat-section/Chatting-section';
import Sidenav from './components/layout/sidenav/Sidenav';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Alerts from './components/alerts/Alerts';
import VideoCall from './components/videocall/VideoCall';

import './App.scss';
console.log('Env var: ', process.env);
function HelomiDefaultImg() {
   return (
      <div className='default-img'>
         <img src={process.env.PUBLIC_URL + '/img/helomi-bg.JPG'} />
      </div>
   );
}

function App({ alerts, user, isOnVideoCall, dispatch }) {
   // useEffect(() => {
   //    dispatch(loadUser());
   // }, []);
   return (
      <ThemeProvider>
         <SocketProvider>
            <Alerts alerts={alerts} />
            <Navbar />
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route
               path='/dashboard'
               render={() =>
                  user.isLoggedIn ? <Sidenav /> : <Redirect to='/login' />
               }
            />
            <Route exact path='/dashboard' component={HelomiDefaultImg} />
            <Route
               exact
               path='/dashboard/chats/:id'
               render={routeProps =>
                  user.isLoggedIn ? (
                     <ChattingSection {...routeProps} />
                  ) : (
                     <Redirect to='/login' />
                  )
               }
            />
            {isOnVideoCall && <VideoCall />}
         </SocketProvider>
      </ThemeProvider>
   );
}

const mapStateToProps = createStructuredSelector({
   alerts: selectAllAlerts,
   user: selectUser,
   isOnVideoCall: selectIsOnVideoCall,
   caller: selectCaller
});

export default withRouter(connect(mapStateToProps)(App));
