import React from 'react';

function TextInput({ onFocusOut, ...restProps }) {
   return <input {...restProps} onBlur={onFocusOut} />;
}
export default TextInput;
