// import React, { useState } from 'react';
// import "../../../Pages/ECommerce/ECommerce.css";
// import "./Multiselect.css";

// const SearchMultiple = ({ label, name, placeholder, options, onSelect, selectedItems }) => {
//   const [inputValue, setInputValue] = useState('');
//   const [filteredOptions, setFilteredOptions] = useState([]);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);
//     const filtered = options.filter(option =>
//       option.toLowerCase().includes(value.toLowerCase()) && !selectedItems.includes(option)
//     );
//     setFilteredOptions(filtered);
//   };

//   const handleSelectOption = (option) => {
//     setInputValue('');  // Clear input after selection
//     setFilteredOptions([]); // Clear the dropdown after selection
//     onSelect(option); // Notify parent component of selection
//   };

//   const handleRemoveSelected = (option) => {
//     // Trigger the de-selection event in the parent
//     onSelect(option, true); // Pass true as the second argument to indicate removal
//   };

//   return (
//     <div className='GeneralFields-LinkedData'>
//       <label htmlFor={name} className='Data-Label-Linked'>{label}</label>
//       <div className="Search-Select-Field">
//         <div className="selected-items">
//           {selectedItems.map((item, index) => (
//             <div className="selected-item-tag" key={index}>
//               {item}
//               <span className="remove-tag" onClick={() => handleRemoveSelected(item)}>×</span>
//             </div>
//           ))}
//         </div>
//         <input
//           type="text"
//           id={name}
//           name={name}
//           className='Data-Field-Linked'
//           placeholder={placeholder}
//           value={inputValue}
//           onChange={handleInputChange}
//         />
//         {filteredOptions.length > 0 && (
//           <ul className='suggestion-list'>
//             {filteredOptions.map((item, index) => (
//               <li key={index} onClick={() => handleSelectOption(item)}>
//                 {item}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchMultiple;

import React, { useState } from 'react';
import "../../../Pages/ECommerce/ECommerce.css";
import "./Multiselect.css";

const SearchMultiple = ({ label, name, placeholder, options, onSelect, selectedItems }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase()) && !selectedItems.includes(option)
    );
    setFilteredOptions(filtered);
  };

  const handleSelectOption = (option) => {
    setInputValue('');  // Clear input after selection
    setFilteredOptions([]); // Clear the dropdown after selection
    onSelect(option); // Notify parent component of selection
  };

  const handleRemoveSelected = (option) => {
    onSelect(option, true); // Pass true as the second argument to indicate removal
  };

  return (
    <div className='GeneralFields-LinkedData'>
      <div className="Search-Select-Field">
        <div className="selected-items-wrapper">
          {selectedItems.map((item, index) => (
            <div className="selected-item-tag" key={index}>
              {item}
              <span className="remove-tag" onClick={() => handleRemoveSelected(item)}>×</span>
            </div>
          ))}

          <input
            type="text"
            id={name}
            name={name}
            className='AttributeData-Field'
            placeholder={selectedItems.length === 0 ? placeholder : ''}
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>

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

export default SearchMultiple;
