import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { themeContext } from '../../../contexts/ThemeProvider';
import {
   ZOOM_TO_FULLSCREEN,
   EXIT_FULLSCREEN
} from '../../../redux/videocall/videocall.action.types';
import { selectIsFullscreen } from '../../../redux/videocall/videocall.selectors';

import './CallMoreOptions.scss';

function CallMoreOptions({ isFullscreen, dispatch }) {
   const { appTheme, toggleTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   return (
      <div className={`videocall__call__more-actions`}>
         <input type='checkbox' id='more-actions' />
         <label htmlFor='more-actions'>
            <span>
               <i className='fas fa-ellipsis-v'></i>
            </span>
            <ul
               className={`videocall__call__options remove-bullets ${
                  darkTheme && 'd-theme'
               }`}>
               <li
                  className='videocall__call__option'
                  onClick={
                     isFullscreen
                        ? () => dispatch({ type: EXIT_FULLSCREEN })
                        : () => dispatch({ type: ZOOM_TO_FULLSCREEN })
                  }>
                  <i
                     className={`fas fa-${
                        isFullscreen ? 'compress' : 'expand'
                     }-arrows-alt`}></i>
                  <span>
                     {isFullscreen ? 'Exit full screen' : 'Zoom to fullscreen'}
                  </span>
               </li>
               <li className='videocall__call__option' onClick={toggleTheme}>
                  <i className='fas fa-sun'></i>
                  <span>Switch to {darkTheme ? 'light' : 'dark'} theme</span>
               </li>
            </ul>
         </label>
      </div>
   );
}

const mapStateToProps = createStructuredSelector({
   isFullscreen: selectIsFullscreen
});
export default connect(mapStateToProps)(CallMoreOptions);
