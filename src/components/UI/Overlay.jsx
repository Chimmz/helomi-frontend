import React from 'react';
import './Overlay.scss';

const Overlay = ({ showIf: isVisible, transparent, ...restProps }) => (
   <div
      className={`overlay overlay--${!isVisible && 'hidden'} ${
         transparent && 'overlay--transparent'
      }`}
      {...restProps}
   ></div>
);
export default Overlay;
