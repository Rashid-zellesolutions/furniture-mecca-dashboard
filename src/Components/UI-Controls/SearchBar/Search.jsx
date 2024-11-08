import React from 'react';
import './Search.css'; // Import the CSS file

const SearchBar = ({ onSearch, icon, placeholder }) => {
  // Handler for the search button
  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder={placeholder || "Search product by name"}  
        className="search-inputField" 
      />
      <button 
        onClick={handleSearch} 
        className="search-button"
      >
        <img src={icon} alt="search icon" className="search-iconImage" />
      </button>
    </div>
  );
};

export default SearchBar;
