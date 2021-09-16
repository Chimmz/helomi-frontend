import React, { useContext } from 'react';
import { themeContext } from '../../../contexts/ThemeProvider';
import './ThemeToggler.scss';

function ThemeToggler() {
   const { appTheme, toggleTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   return (
      <div
         className={`navbar__theme-toggler ${darkTheme && 'd-theme'}`}
         onClick={toggleTheme}
         data-status={`${darkTheme ? 'Dark' : 'Light'}`}
      >
         <span className='navbar__theme-toggler__switch'></span>
      </div>
   );
}

export default ThemeToggler;
