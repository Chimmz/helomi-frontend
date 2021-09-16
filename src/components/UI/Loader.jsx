import React, { useContext, useEffect, useRef } from 'react';
import { themeContext } from '../../contexts/ThemeProvider';
import { toFirstLetterUpper } from '../../utils/others';

import './Loader.scss';

function LoadingSpinner({ size, msg, showIf: conditionToShow }) {
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';
   const loaderRef = useRef();

   // useEffect(() => {
   //    if (!conditionToShow) loaderRef.current.classList.add('u-hidden');
   // }, []);

   return (
      <div className={`loader ${darkTheme && 'd-theme'}`} ref={loaderRef}>
         <div className={`loader__spinner loader__spinner--${size} `}></div>
         {msg && (
            <h4 className={`loader__msg loader__msg--${size}`}>
               {toFirstLetterUpper(msg)}
            </h4>
         )}
      </div>
   );
}
export default LoadingSpinner;
