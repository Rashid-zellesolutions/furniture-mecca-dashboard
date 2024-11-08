import React, { useState } from "react";
import "./Accordian.css";
import openIcon from '../../../Assets/Images/dropup 20 x 20.png';
import closeIcon from '../../../Assets/Images/dropdown 20 x 20.png';
import { RiDeleteBinLine } from "react-icons/ri";

const AttributeAccordion = ({ title, content, handleDelete, toggleLabel, showDeleteIcon = true, showToggleIcon = true, flexDirection = "column", }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="attribute-accordion-container">
      <div className="attribute-accordion-header" onClick={toggleAccordion}>
        <span>{title}</span>
        <div className="attribute-accordion-actions">
          {/* Conditionally render the delete button based on showDeleteIcon prop */}
          {showDeleteIcon && (
          <span className="delete-icon" onClick={() => handleDelete(title)}>
          <RiDeleteBinLine className="delete-btn" />
          </span>
          )}
          {/* Toggle accordion button */}
          {showToggleIcon && (
          <span
            className={`attribute-accordion-icon ${isOpen ? 'rotate' : ''} ${toggleLabel ? 'edit-text' : ''}`} 
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
      <div className={`attribute-accordion-content-wrapper ${isOpen ? 'show' : ''}`}>
        <div className="attribute-accordion-content" style={{ flexDirection }}>{content}</div>
      </div>
    </div>
  );
};

export default AttributeAccordion;
  
