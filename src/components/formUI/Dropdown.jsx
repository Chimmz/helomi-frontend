import React from 'react';
import './Dropdown.scss';

function Dropdown(props) {
   const {
      showIf: isVisble,
      className,
      children: listItems,
      ...restProps
   } = props;
   return (
      isVisble && (
         <ul className={className + ' dropdown remove-bullets'} {...restProps}>
            {listItems}
         </ul>
      )
   );
}
export default Dropdown;
