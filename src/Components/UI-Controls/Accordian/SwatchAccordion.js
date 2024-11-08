import React, { useState } from "react";
import "./SwatchAccordion.css";
import openIcon from '../../../Assets/Images/dropup 20 x 20.png';
import closeIcon from '../../../Assets/Images/dropdown 20 x 20.png';
import { RiDeleteBinLine } from "react-icons/ri";

const SwatchAccordion = ({ title, content, handleDelete, toggleLabel, showDeleteIcon = true, showToggleIcon = true,  }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="swatch-accordion-container">
      <div className="swatch-accordion-header" onClick={toggleAccordion}>
        <span>{title}</span>
        <div className="swatch-accordion-actions">
          {/* Conditionally render the delete button based on showDeleteIcon prop */}
          {showDeleteIcon && (
          <span className="delete-icon" onClick={() => handleDelete(title)}>
          <RiDeleteBinLine className="delete-btn" />
          </span>
          )}
          {/* Toggle accordion button */}
          {showToggleIcon && (
          <span
            className={`swatch-accordion-icon ${isOpen ? 'rotate' : ''} ${toggleLabel ? 'edit-text' : ''}`} 
            onClick={toggleAccordion}
          >
            {/* Use the toggleLabel instead of icon */}
            {toggleLabel ? toggleLabel : (
              <img src={isOpen ? openIcon : closeIcon} alt="toggle-icon" />
            )}
          </span>
          )}
        </div>
      </div>
      <div className={`swatch-accordion-content-wrapper ${isOpen ? 'show' : ''}`}>
        <div className="swatch-accordion-content">{content}</div>
      </div>
    </div>
  );
};

export default SwatchAccordion;
  
