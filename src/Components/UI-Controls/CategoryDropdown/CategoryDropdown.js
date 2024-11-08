import React, { useState } from 'react'
import './CategoryDropdown.css'
import arrowDown from '../../../Assets/Images/dropdown 20 x 20.png'
import deleteIcon from '../../../Assets/Images/delete-red-icon.png'

const CategoryDropdown = (
    {
        dropdownOpen,
        handleSelect,
        deleteDropdown,
        selectedCategories,
        toggleDropdown,
        selectCategoryData,
    }
) => {
    console.log("Selected ategory", selectedCategories)

    return (
        <>
            {selectedCategories && selectedCategories.map((category, index) => (
                <div className='category-dropdown-and-delete-icon'>
                    <div className='category-dropdown'>
                        <div className='category-drop-down-head' onClick={() => toggleDropdown(index)}>
                            <p>{category.name || 'Select Category'}</p>
                            <img src={arrowDown} alt='arrow-down' />
                        </div>
                        <div className={`categor-drop-down-items ${dropdownOpen[index] === true ? 'show-drop-down-items' : ''}`}>
                            {selectCategoryData.map((cat) => (
                                <p key={cat} onClick={() => handleSelect(index, cat)}>{cat.name}</p>
                            ))}
                        </div>
                    </div>
                    {index > 0 && (
                        <button className='delete-button' onClick={() => deleteDropdown(index)}>
                            <img src={deleteIcon} alt='delete icon' />
                        </button>
                    )}
                </div>
            ))}
        </>
    )
}

export default CategoryDropdown
