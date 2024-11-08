// import React, { useState } from "react";
// import "./Dropdowncustom.css"; // Add custom styles here
// import openIcon from '../../../Assets/Images/dropup 20 x 20.png';
// import closeIcon from '../../../Assets/Images/dropdown 20 x 20.png';

// const Dropdowncustom = ({ options, selected, onChange, dropdownClass, size = 20 }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleItemClick = (value) => {
//     onChange(value); // Pass selected value to the parent
//     setIsOpen(false); // Close dropdown when item is selected
//   };

//   return (
//     <div className={`dropdown-wrapper ${dropdownClass}`}>
//       <div className={`dropdown-header ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
//         {/* Updated here to handle cases where selected is undefined */}
//         {selected ? options.find(option => option.value === selected)?.label || "None" : "None"}
//         <img
//           src={isOpen ? openIcon : closeIcon}
//           alt={isOpen ? 'Close dropdown' : 'Open dropdown'}
//           className="dropdown-icon"
//           style={{ width: `${size}px`, height: `${size}px` }}
//         />
//       </div>
//       {isOpen && (
//         <ul className="dropdown-list">
//           {options.map((option, index) => (
//             <li
//               key={index}
//               className={`dropdown-item ${selected === option.value ? "selected" : ""}`}
//               onClick={() => handleItemClick(option.value)}
//             >
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Dropdowncustom;

import React, { useState } from "react";
import "./Dropdowncustom.css"; // Add custom styles here
import openIcon from '../../../Assets/Images/dropup 20 x 20.png';
import closeIcon from '../../../Assets/Images/dropdown 20 x 20.png';

const Dropdowncustom = ({
  options, 
  selected, 
  onChange, 
  dropdownClass, 
  size = 20,
  headerBgColor = "#f9f9f9", // Default header background color
  listBgColor = "#f9f9f9" // Default list background color
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (value) => {
    onChange(value); // Pass selected value to the parent
    setIsOpen(false); // Close dropdown when item is selected
  };

  return (
    <div className={`dropdown-wrapper ${dropdownClass}`}>
      <div
        className={`dropdown-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: headerBgColor }} // Set header background color dynamically
      >
        {/* Updated here to handle cases where selected is undefined */}
        {selected ? options.find(option => option.value === selected)?.label || "None" : "None"}
        <img
          src={isOpen ? openIcon : closeIcon}
          alt={isOpen ? 'Close dropdown' : 'Open dropdown'}
          className="dropdown-icon"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </div>
      {isOpen && (
        <ul
          className="dropdown-list"
          style={{ backgroundColor: listBgColor }} // Set list background color dynamically
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${selected === option.value ? "selected" : ""}`}
              onClick={() => handleItemClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdowncustom;
