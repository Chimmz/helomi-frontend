import React, { createContext } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAppTheme } from '../redux/appsettings/appsettings.selectors';
import { TOGGLE_APP_THEME } from '../redux/appsettings/appsettings.actions';

export const themeContext = createContext();

function ThemeProvider(props) {
   const { appTheme, toggleTheme } = props;

   return (
      <themeContext.Provider value={{ appTheme, toggleTheme }}>
         {props.children}
      </themeContext.Provider>
   );
}
const mapStateToProps = createStructuredSelector({
   appTheme: selectAppTheme
});
const mapDispatchToProps = dispatch => ({
   toggleTheme: () => dispatch({ type: TOGGLE_APP_THEME })
});
export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);
