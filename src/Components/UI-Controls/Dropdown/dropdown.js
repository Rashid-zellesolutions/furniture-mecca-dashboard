// import React, { useState } from 'react';
// import './dropdown.css'; // For custom styles
// import openIcon from '../../../Assets/Images/dropup 20 x 20.png';
// import closeIcon from '../../../Assets/Images/dropdown 20 x 20.png';

// const CustomDropdown = ({ options, selectedOption, handleOptionChange }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="custom-dropdown">
//       <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
//         {selectedOption || "Select Parent Category"}
//         <span className="dropdown-arrow" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
//           <img src={isOpen ? openIcon : closeIcon} alt="toggle" />
//         </span>
//       </div>
//       <div className={`dropdown-options ${isOpen ? 'show' : ''}`}>
//         {options.map((option, index) => (
//           <div
//             key={index}
//             className="dropdown-option"
//             onClick={() => {
//               handleOptionChange(option.value);
//               setIsOpen(false);
//             }}
//           >
//             {option.label}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomDropdown;

import React, { useState } from 'react';
import './dropdown.css'; // For custom styles
import openIcon from '../../../Assets/Images/dropup 20 x 20.png'; // This should be the image for the dropdown being open
import closeIcon from '../../../Assets/Images/dropdown 20 x 20.png'; // This should be the image for the dropdown being closed

const CustomDropdown = ({ options, selectedOption, handleOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-dropdown">
      <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || "Select..."}
        <span className="dropdown-arrow" style={{ transform: isOpen ? 'rotate(360deg)' : 'rotate(0deg)' }}>
          <img src={isOpen ? openIcon : closeIcon} alt="toggle" />
        </span>
      </div>
      <div className={`dropdown-options ${isOpen ? 'show' : ''}`}>
        {options.map((option, index) => (
          <div
            key={index}
            className="dropdown-option"
            onClick={() => {
              handleOptionChange(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDropdown;