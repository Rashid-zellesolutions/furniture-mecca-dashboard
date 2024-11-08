import React, { useState } from 'react';
import "../../../Pages/ECommerce/ECommerce.css";
import "./InputSearch.css";

const SearchInput = ({ label, name, placeholder, options, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelectOption = (option) => {
    setInputValue('');  // Clear input after selection
    setFilteredOptions([]); // Clear the dropdown after selection
    onSelect(option); // Notify parent component of selection
  };

  return (
    <div className='GeneralFields-LinkedData'>
      <label htmlFor={name} className='Data-Label-Linked'>{label}</label>
      <div className="Search-Select-Field">
        <input
          type="text"
          id={name}
          name={name}
          className='Data-Field-Linked'
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        {filteredOptions.length > 0 && (
          <ul className='suggestion-list'>
            {filteredOptions.map((item, index) => (
              <li key={index} onClick={() => handleSelectOption(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
