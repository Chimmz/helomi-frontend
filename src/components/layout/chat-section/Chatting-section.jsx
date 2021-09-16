import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { selectIsLoadingChatMsgs } from '../../../redux/chat/chat.selectors';
import ChatFooter from './Chat-footer';
import ChatHeader from './Chat-header';
import MessagesBox from './Messages-box';

import { themeContext } from '../../../contexts/ThemeProvider';
import LoadingSpinner from '../../UI/Loader';
import './Chatting-section.scss';

function ChattingSection({ isLoadingMsgs }) {
   const { appTheme } = useContext(themeContext);
   const darkTheme = appTheme === 'dark';

   return (
      <React.Fragment>
         <div className={`chatting-section ${darkTheme && 'd-theme'}`}>
            <ChatHeader />
            <MessagesBox />
            <ChatFooter />
            {isLoadingMsgs && (
               <LoadingSpinner size='lg' msg='loading messages...' />
            )}
         </div>
      </React.Fragment>
   );
}
const mapStateToProps = (state, ownProps) => ({
   isLoadingMsgs: selectIsLoadingChatMsgs(ownProps.match.params.id)(state)
});
export default connect(mapStateToProps)(ChattingSection);
