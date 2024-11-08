import React from "react";
import PropTypes from "prop-types";
import "./Btn.css"; // Custom styles for the button
import plusIcon from "../../../Assets/Images/Plus 24 x 24.png"; // Default plus icon
import importIcon from "../../../Assets/Images/Download 18 x 18.png"; // Import icon
import exportIcon from "../../../Assets/Images/Upload 18 x 18.png"; // Export icon
import filterIcon from "../../../Assets/Images/FilterBtn 22 x 22.png";

const CustomBtn = ({
  label,
  onClick,
  type = "button",
  className,
  disabled = false,
  style,
  withIcon = false,
  iconType = "plus", // Default iconType is 'plus'
}) => {
  // Conditional icon rendering logic based on iconType
  const renderIcon = () => {
    if (withIcon) {
      switch (iconType) {
        case "plus":
          return <img src={plusIcon} alt="plus icon" className="plus-btn" />;
        case "import":
          return (
            <img src={importIcon} alt="import icon" className="import-btn" />
          );
        case "export":
          return (
            <img src={exportIcon} alt="export icon" className="export-btn" />
          );
        case "filter":
          return (
            <img src={filterIcon} alt="filter icon" className="filter-btn" />
          )
        // Add more cases for other icons if needed
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-btn ${className}`}
      disabled={disabled}
      style={style}
    >
      {renderIcon()}
      {label}
    </button>
  );
};

CustomBtn.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  withIcon: PropTypes.bool, // Optional prop to include the icon
  iconType: PropTypes.string, // Icon type (e.g., 'plus', 'import', 'export', 'filter') for customization
};

export default CustomBtn;
