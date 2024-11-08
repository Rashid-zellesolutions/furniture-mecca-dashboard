import React, { useCallback, useEffect, useRef, useState } from 'react'
import './ImageGalleryPopup.css'
import axios from 'axios';
// utils
// import { uploadImage } from '../../../../Services/functions'

// images import
// import checkImage from '../../../../Assets/check-images/New-Jersey-images-1-600x400 1.png';

// icons import
import crossButton from '../../../../Assets/Images/cross-button-32-X-32.png'
import arrowDown from '../../../../Assets/Images/dropdown 20 x 20.png'
import uploadImageIcon from '../../../../Assets/Images/uploadImg 48 x 48.png'

// Components and utils
import InputField from '../../InputField/InputField';
import { url } from '../../../../Services/Api'


const ImageGalleryPopup = ({
    showImageGalleryPopUp,
    handleModalView,
    onImageSelect,
    setImageSendPayload,
    imageSendPayload,
    data,
    handleFileChange,
    editGalleryImageApi,
    // loading,
}) => {

    // All States
    const [activeTab, setActiveTab] = useState('upload');
    const fileInputRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedImageId, setSelectedImageId] = useState(null)
    const [isEditAble, setIsEditAble] = useState(false);
    const [filterOpenIndex, setFilterOpenIndex] = useState(null);
    const [selectedImageIndex, setSelectedImageINdex] = useState(null)
    const [originalValues, setOriginalValues] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    console.log("loading state in popup comp", isLoading)
    const handleSelectImageId = (index) => {
        setSelectedImageINdex(index);
        console.log("selected id", index)
    }

    const onUpload = (e) => {
        handleFileChange(e)
        setActiveTab('gallery')
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }

    const handleImageUploadChange = (event) => {
        const { name, value } = event.target;
        setImageSendPayload((prevData) => ({
            ...prevData,
            [name]: value,
        }))
        setSelectedImage((prev) => ({ ...prev, [name]: value }));
    }

    const hansChange = () => {
        return Object.keys(originalValues).some((key) => originalValues[key] !== selectedImage[key]);
    };

    const handleUpdate = async () => {
        console.log("clicked update btn")
        if (!hansChange()) {
            return alert("No changes to update");
        }

        // Construct the payload
        const payload = {
            alt_text: selectedImage.alt_text,
            title: selectedImage.title,
            description: selectedImage.description,
            link_url: selectedImage.link_url,
            // Include other properties as necessary
        };

        // Optional: include file if it's present
        if (imageSendPayload.file) {
            payload.file = imageSendPayload.file;
        }

        const formData = new FormData();
        formData.append('alt_text', payload.alt_text);
        formData.append('title', payload.title)
        formData.append('description', payload.description);
        formData.append('link_url', payload.link_url);
        console.log("payload to update", formData);

        try {
            const response = await axios.put(`${url}${editGalleryImageApi}${selectedImage._id}`, formData);
            console.log("updated Data successfully", response.data);
            setOriginalValues(({ ...selectedImage }));
            setIsEditAble(false);
        } catch (error) {
            console.error('updating failed', error);
        }
    }

    const handleSelectedImage = (item) => {
        setSelectedImage(item)
        setSelectedImageId(item._id)
        setOriginalValues({ ...item });
        console.log("selected image", item)
    };

    const setImageToCMS = () => {
        onImageSelect(selectedImage)
    }

    const imageGalleryFilterData = [
        { name: 'All media items', items: ['item one', 'item two', 'item three'] },
        { name: 'All media items', items: ['item one', 'item two', 'item three'] },
    ]

    const tabs = [
        { id: 'upload', label: 'Upload Image' },
        { id: 'gallery', label: 'Media Gallery' },
    ];

    const imageEditInputData = [
        { label: 'Alternate Text', placeholder: 'Text', val: 'alt_text', name: 'alt_text' },
        { label: 'Title', placeholder: 'Title', val: 'title', name: 'title' },
        { label: 'Description', placeholder: 'Description', val: 'description', name: 'description' },
        { label: 'Url', placeholder: 'url', val: 'link_url', name: 'link_url' }
    ]

    // local functions 
    const handleTabActive = (id) => {
        setActiveTab(id);
    }
    const handleFilterOpen = (index) => {
        setFilterOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    }
    const handleEditInput = () => {
        setIsEditAble(!isEditAble)
    }
    const handleImageClick = () => {
        fileInputRef.current.click();
    }

    const changeDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    console.log("selected image lengthtttt ", selectedImage)
    return (
        <div
            className={`image-gallery-pop-up-main-container 
            ${showImageGalleryPopUp ? 'show-image-gallery-pop-up' : ''}`
            }
        >
            <div className='image-gallery-inner-container'>
            {isLoading && <div className='image-gallery-popup-loader'></div>}
                {/* Modal Close Button */}
                <button type='button' onClick={handleModalView} className='image-gallery-close-modal' >
                    <img src={crossButton} alt='close-modal-button' />
                </button>

                {/* Main Heading Section */}
                <div className='image-gallery-header-section'>
                    <p className='image-gallery-heading'>Add image to product gallery</p>
                    <div className='image-gallery-tabs-select'>
                        {tabs.map(tab => (
                            <div
                                key={tab.id}
                                className={`image-gallery-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => handleTabActive(tab.id)}
                            >
                                <p>{tab.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Images Gallery Body section */}
                <div className='image-gallery-main-containt-section'>

                    <div className="content">
                        {/* Upload Image Tab */}
                        <div className={`content-item ${activeTab === 'upload' ? 'active' : ''}`}>
                            <div className='upload-images-main-container'>
                                <p>Click or Drag to Upload</p>
                                <div className='upload-image-icon-div' onClick={handleImageClick}>
                                    <img src={uploadImageIcon} alt='upload-image' />
                                    <input
                                        type='file'
                                        accept='image/*'
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        // onChange={handleFileChange}
                                        onChange={onUpload}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Gallery Tab */}
                        <div className={`content-item ${activeTab === 'gallery' ? 'active' : ''}`}>
                            <div className='image-gallery'>
                                <div className='image-gallery-select-images-section'>

                                    <h3>Filter Media</h3>
                                    {/* Filders Dropdown */}
                                    <div className='image-gallery-filter-dropdown-section'>
                                        {imageGalleryFilterData.map((items, index) => (
                                            <div className={`image-gallery-filter`} onClick={() => handleFilterOpen(index)}>
                                                <div className='image-gallery-filter-name'>
                                                    <p>{items.name}</p>
                                                    <img src={arrowDown} alt='arrow-down' className={`filter-arrow-down ${filterOpenIndex === index ? 'rotate-filter-icon' : ''}`} />
                                                </div>
                                                <div
                                                    className={`image-gallery-dropdown 
                                                        ${filterOpenIndex === index ? 'show-filters' : ''}`}
                                                >
                                                    {items.items.map((item, index) => (
                                                        <p>{item}</p>
                                                    ))}
                                                </div>

                                            </div>
                                        ))}
                                    </div>

                                    <div className='images-gallery-and-detail-section'>

                                        {/* Images Gallery images */}
                                        {data && data.map((item, index) => (
                                            <div className={`image-gallery-section ${selectedImageIndex === index ? 'select-image' : ''}`}>
                                                <div className="checkbox-design"></div>
                                                <img
                                                    key={item._id}
                                                    src={`${url}${item.image_url}`}
                                                    alt={data.alt_text}
                                                    onClick={() => { handleSelectedImage(item); handleSelectImageId(index) }}
                                                />
                                            </div>
                                        ))}

                                    </div>
                                </div>

                                {/* Selected Image Full Details */}
                                <div className='images-containt-section'>
                                    {selectedImage && Object.keys(selectedImage).length > 0 ? (
                                        <div className='selected-image-full-details'>
                                            {/* Selected Image Section */}
                                            <div className='edit-image-container'>
                                                {selectedImage && <img src={selectedImage && `${url}${selectedImage.image_url}`} alt='check' />}
                                            </div>

                                            {/* Selected image details section */}
                                            <div className='image-details-section'>
                                                <h3>{selectedImage && selectedImage.title}</h3>
                                                {/* <p>{selectedImage && selectedImage.updatedAt}</p> */}
                                                <p>{selectedImage && changeDate(selectedImage.updatedAt)}</p>
                                                <p>132 kb</p>
                                                <p>1400 x 906</p>
                                            </div>

                                            {/* Gallery Data Edit and Delete section */}
                                            <div className='edit-and-delete-image-section'>
                                                <button className='edit-image-button' onClick={handleEditInput}>
                                                    Edit image
                                                </button>
                                                <button className='delete-image-button'>
                                                    Delete Image Permanently
                                                </button>
                                            </div>

                                            {/* Gallery Data input fields */}
                                            <div className='image-gallery-inputs'>
                                                {imageEditInputData.map((items, index) => (
                                                    <InputField
                                                        key={index}
                                                        labelText={items.label}
                                                        color={'#595959'}
                                                        fontSize={'15px'}
                                                        fontWeight={'600'}
                                                        lineHeight={'18px'}
                                                        type={'text'}
                                                        placeholder={items.placeholder}
                                                        // value={`${selectedImage}${items.val}`}
                                                        value={selectedImage ? selectedImage[items.name] : ''}
                                                        // value={inputValues[items.val]}
                                                        name={items.name}
                                                        onChange={handleImageUploadChange}
                                                        readOnly={!isEditAble}
                                                    />
                                                ))}
                                            </div>
                                            {isEditAble && (
                                                <button className='update-image-button' onClick={handleUpdate}>
                                                    Update
                                                </button>
                                            )}
                                        </div>
                                    ) : null}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer add to gallery section */}
                <div className={`image-gallery-modal-footer ${activeTab === 'upload' ? 'image-gallery-footer-hide' : ''}`}>
                    {selectedImage && (
                        <button className={`add-to-gallery-btn`} type='button' onClick={setImageToCMS}>
                            Add to gallery
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ImageGalleryPopup
