import React, { useState, useEffect } from 'react'
import './BestSellerSection.css'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead'
import arrowDown from '../../../Assets/Images/dropdown 20 x 20.png';
import uploadImageIcon from '../../../Assets/Images/uploadImg 48 x 48.png'
import CategoryDropdown from '../../UI-Controls/CategoryDropdown/CategoryDropdown';
import ImageGalleryPopup from '../../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup';
import InfoPopUp from '../../InfoPopUp/InfoPopUp';

const BestSellerSection = () => {

  const [showCategory, setShowCategory] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [selectedImage, setSelectedImage] = useState([])
  const [inputTitle, setInputTitle] = useState('');
  const [combinedData, setCombinedData] = useState([]);
  const [infoModal, setInfoModal] = useState(false);


  const handleCategoryDropDown = () => { setShowCategory(!showCategory) }

  // Modal open and close functions
    const handeShowInfoModal = () => {
        setInfoModal(true)
    }
    const handleCloseInfoModal = () => {
        setInfoModal(false);
    }


  const selectCategoryData = [
    { name: 'None' },
    { name: 'Bedroom' },
    { name: 'Living Room' },
    { name: 'Dining Room' },
    { name: 'Outlets' },
    { name: 'Matterasses' },

  ]

  // Gallery modal
  const handleModalOpen = () => {
    setModalView(true)
  }
  const handleModalClose = () => {
    setModalView(false)
  }

  // get images in homepage slider 
  const handleImageSelect = (image) => {
    setSelectedImage((prevImages) => {
      const newSelectedIMages = [...prevImages, image];
      return newSelectedIMages;
    })
    setModalView(false);
  };

  // Multi Select
  const [selectedCategories, setSelectedCategories] = useState(['']);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
    console.log("toggle dropdown", dropdownOpen)
  };

  const handleSelect = (index, category) => {
    const newCategory = [...selectedCategories];
    newCategory[index] = category;
    setSelectedCategories(newCategory);
    setDropdownOpen(false);
    console.log("handle select", dropdownOpen)
    console.log("new category", newCategory)
  }

  const deleteDropdown = (index) => {
    setSelectedCategories((prev) => prev.filter((_, i) => i !== index));
  }


  // Update combinedData whenever inputTitle, selectedCategories, or selectedImage changes
  useEffect(() => {
    const newEntry = {
      title: inputTitle,
      categories: selectedCategories,
      images: selectedImage,
    };
    setCombinedData([newEntry]); // Store as an array with a single object

    // Log combined data for debugging
    console.log("Combined State: ", combinedData);
  }, [inputTitle, selectedCategories, selectedImage]);

  return (
    <div>
      <CMSHead
        heading={"Best Seller"}
        buttonText={"Save"}
        handeShowInfoModal={handeShowInfoModal}
      />
      <div className='best-seller-category'>
        <div className='best-seller-inner-section'>
          <div className='best-seller-dropdown-main'>
            <div className='best-seller-drop-down-head' onClick={handleCategoryDropDown}>
              <p>Add Category</p>
              <img src={arrowDown} alt='arrow-down' />
            </div>
            <div className={`best-seller-dropdown-body ${showCategory ? 'show-category' : ''}`}>
              <div className='best-seller-dropdown-containt'>
                <div className='best-seller-category-image-upload-div' onClick={handleModalOpen}>
                  <img src={uploadImageIcon} alt='upload image' />
                </div>
                <div className='best-seller-dropdown-inputs-div'>
                  <input
                    type='text'
                    placeholder='Text'
                    className='best-seller-category-title-input'
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)} // Update title state 
                  />
                  <CategoryDropdown
                    selectedCategories={selectedCategories}
                    selectCategoryData={selectCategoryData}
                    toggleDropdown={toggleDropdown}
                    dropdownOpen={dropdownOpen}
                    handleSelect={handleSelect}
                    deleteDropdown={deleteDropdown}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='best-seller-category-btn'>
            <button>
              + add
            </button>
          </div>
        </div>
      </div>
      <ImageGalleryPopup
        showImageGalleryPopUp={modalView}
        handleModalView={handleModalClose}
        onImageSelect={handleImageSelect}
      />
      <InfoPopUp
                showInfoModal={infoModal}
                handleCloseInfoModal={handleCloseInfoModal}
            />
    </div>
  )
}

export default BestSellerSection
