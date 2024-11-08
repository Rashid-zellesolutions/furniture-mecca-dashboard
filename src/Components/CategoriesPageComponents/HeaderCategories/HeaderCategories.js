import React, { useState } from 'react'
import './HeaderCategories.css'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead'
import InfoPopUp from '../../InfoPopUp/InfoPopUp';
import crossBtn from '../../../Assets/Images/cross-button-32-X-32.png'
import uploadImageIcon from '../../../Assets/Images/uploadImg 48 x 48.png';

const HeaderCategories = () => {
    const [infoModal, setInfoModal] = useState(false);
    const [selectedNavItem, setSelectedNavItem] = useState([])
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
    const headerCategoriesItems = [
        { name: 'Living Room', link: '#' },
        { name: 'Bed Room', link: '#' },
        { name: 'Dining Room', link: '#' },
        { name: 'Kids Room', link: '#' },
        { name: 'Accent Furniture', link: '#' },
        { name: 'Rugs', link: '#' },
        { name: 'Small Spaces', link: '#' },
    ]
    const headerCategoriesInnerItems = [
        { name: 'Dining Room Set', link: '#' },
        { name: 'Dining Room Set', link: '#' },
        { name: 'Dining Room Set', link: '#' },
        { name: 'Dining Room Set', link: '#' },
        { name: 'Dining Room Set', link: '#' },
        { name: 'Dining Room Set', link: '#' },
    ]
    const categoriesImageUploadOption = [
        { title: 'Upload Image 1', icon: uploadImageIcon },
        { title: 'Upload Image 2', icon: uploadImageIcon },
        { title: 'Upload Image 2', icon: uploadImageIcon },
    ]


    // Modal open and close functions
    const handeShowInfoModal = () => {
        setInfoModal(true)
    }
    const handleCloseInfoModal = () => {
        setInfoModal(false);
    }

    const handleSelectNavItem = (index) => {
        setSelectedNavItem((prevselected) => {
            const newSelected = prevselected.includes(index) ?
                prevselected.filter(item => item !== index) :
                [...prevselected, index];

            if (newSelected.length > 0) {
                setOpenDropdownIndex(index);
                setLastSelectedIndex(index)
            } else {
                setOpenDropdownIndex(null)
                setLastSelectedIndex(null)
            }
            return newSelected;
        })
        console.log("Selected Nav Index", selectedNavItem)
    }

    const removeSelectedNav = (index) => {
        setSelectedNavItem((prevSelected) => {
            const newSelected = prevSelected.filter(item => item !== index);
            if (newSelected.length === 0) {
                setOpenDropdownIndex(null)
                setLastSelectedIndex(null)
            } else {
                setLastSelectedIndex(newSelected[newSelected.length - 1]);
            }
            return newSelected
        })
    }

    return (
        <div className='header-categories-main-section'>
            <CMSHead
                heading={'Header Categories'}
                buttonText={'Save'}
                handeShowInfoModal={handeShowInfoModal}
            />
            <div className='header-categories-body-section'>
                <div className='header-categories-items'>
                    {headerCategoriesItems.map((items, index) => (
                        <div key={index} className='header-categories-nav-single-item'>
                            <button
                                className={`
                                    remove-header-category-select 
                                    ${selectedNavItem.includes(index) ?
                                        'show-cross-btn' : ''}
                                `}
                                onClick={() => removeSelectedNav(index)}
                            >
                                <img src={crossBtn} alt='delete btn' />
                            </button>
                            <button
                                className={`header-category-nav-items ${selectedNavItem.includes(index) ? 'selected-header-category' : ''}`}
                                onClick={() => handleSelectNavItem(index)}
                            >
                                {items.name}
                            </button>
                            {/* {openDropdownIndex !== null && (
                                <div className='category-nav-item-dropdown'>
                                    <div className='nav-items-section'>
                                        {headerCategoriesInnerItems.map((item, index) => (
                                            <div key={index} className='nav-item-li-and-checkbox'>
                                                <input type='checkbox' id={`customCheckbox-${index}`} />
                                                <label htmlFor={`customCheckbox-${index}`}>{item.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='nav-images-section'>
                                        {categoriesImageUploadOption.map((items, index) => (
                                            <div key={index} className='header-categories-upload-image'>
                                                <p>{items.title}</p>
                                                <img src={items.icon} alt='upload-image' />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )} */}
                        </div>
                    ))}



                </div>
                {openDropdownIndex !== null && (
                    <div className='category-nav-item-dropdown'>
                        <div className='nav-items-section'>
                            {headerCategoriesInnerItems.map((item, index) => (
                                <div key={index} className='nav-item-li-and-checkbox'>
                                    <input type='checkbox' id={`customCheckbox-${index}`} />
                                    <label htmlFor={`customCheckbox-${index}`}>{item.name}</label>
                                </div>
                            ))}
                        </div>
                        <div className='nav-images-section'>
                            {categoriesImageUploadOption.map((items, index) => (
                                <div key={index} className='header-categories-upload-image'>
                                    <p>{items.title}</p>
                                    <img src={items.icon} alt='upload-image' />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
            <InfoPopUp
                showInfoModal={infoModal}
                handleCloseInfoModal={handleCloseInfoModal}
            />
        </div>
    )
}

export default HeaderCategories
