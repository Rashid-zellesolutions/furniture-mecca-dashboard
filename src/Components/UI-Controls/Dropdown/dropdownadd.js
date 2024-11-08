import React, { useState } from 'react';
import './dropdown.css';
import openIcon from '../../../Assets/Images/dropup 20 x 20.png';
import closeIcon from '../../../Assets/Images/dropdown 20 x 20.png';

const Dropdownresize = ({ options, selectedOption, handleOptionChange, size = 17, }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-dropdown-add">
      <div className="dropdown-selected-add" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || "Product Type"}
        <span className="dropdown-arrow" style={{ transform: isOpen ? 'rotate(360deg)' : 'rotate(0deg)' }}>
          <img src={isOpen ? openIcon : closeIcon} alt="toggle" style={{ width: `${size}px`, height: `${size}px` }}/>
        </span>
      </div>
      <div className={`dropdown-options-add ${isOpen ? 'show' : ''}`}>
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

export default Dropdownresize;