import React, { useState } from 'react';
import './dropdown.css';
import openIcon from '../../../Assets/Images/dropup 20 x 20.png';
import closeIcon from '../../../Assets/Images/dropdown 20 x 20.png';

const Dropdownresize = ({ options, selectedOption, handleOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-dropdown-1">
      <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || "Select..."}
        <span className="dropdown-arrow" style={{ transform: isOpen ? 'rotate(360deg)' : 'rotate(0deg)' }}>
          <img src={isOpen ? openIcon : closeIcon} alt="toggle" />
        </span>
      </div>
      <div className={`dropdown-options-1 ${isOpen ? 'show' : ''}`}>
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