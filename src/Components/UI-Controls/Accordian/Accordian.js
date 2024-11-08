import React, { useState } from "react";
import "./Accordian.css";
import openIcon from '../../../Assets/Images/dropup 20 x 20.png';
import closeIcon from '../../../Assets/Images/dropdown 20 x 20.png';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-container">
      <div className="accordion-header" onClick={toggleAccordion}>
        <span>{title}</span>
        <span className={`accordion-icon ${isOpen ? 'rotate' : ''}`}>
          <img src={isOpen ? openIcon : closeIcon} alt="toggle-icon" />
        </span>
      </div>
      <div className={`accordion-content-wrapper ${isOpen ? 'show' : ''}`}>
        <div className="accordion-content">{content}</div>
      </div>
    </div>
  );
};

export default AccordionItem;