import React, { useEffect, useRef, useState } from 'react'
import './TrandingNow.css';
import CMSHead from '../../UI-Controls/CMSHead/CMSHead';
import imageUploadIcon from '../../../Assets/Images/uploadImg 48 x 48.png';
import ImageGalleryPopup from '../../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup';
import { url } from '../../../Services/Api';
import { uploadImage } from '../../../Services/functions';
import axios from 'axios';
import crossBtn from '../../../Assets/Images/cross-button-32-X-32.png'
import InfoPopUp from '../../InfoPopUp/InfoPopUp';

const TrandingNow = () => {
  const [modalView, setModalView] = useState(false);
  const [uploadedStatus, setUploadedStates] = useState('');
  const [trandingNowMainImageIndex, setTrandingNowMainImageIndex] = useState(0);
  const [mediaDeta, setMediaData] = useState([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [trandingNowMainImages, setTrandingNowMainImages] = useState([])
  const [subImagesData, setSubImagesData] = useState(Array(6).fill(null));
  const [checkCMSData, setCheckCMSData] = useState(null);
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [infoModal, setInfoModal] = useState(false);

  // modal open and close functions
  const handeShowInfoModal = () => {
        setInfoModal(true)
    }
    const handleCloseInfoModal = () => {
        setInfoModal(false);
    }

  const handleImageDelete = async (imageId) => {
    setDeletedImageIds((prev) => [...prev, imageId]); // Track deleted image ID

    // Update checkCMSData to remove the deleted image from the UI
    setCheckCMSData((prevData) => {
      const updatedSliders = prevData.sliders.filter(slider => slider._id !== imageId);
      return {
        ...prevData,
        sliders: updatedSliders
      };
    });
  };

  const handleSubImageDelete = (index) => {
    setSubImagesData((prevData) => {
      const newData = [...prevData];
      newData[index] = null; // Set to null to represent deletion
      return newData;
    });

    // Update checkCMSData to reflect deletion in product data
    setCheckCMSData((prevData) => {
      const updatedProducts = { ...prevData };
      delete updatedProducts[`product_${index + 1}`]; // Remove product entry
      return updatedProducts;
    });
  };

  const [imageSendPayload, setImageSendPayload] = useState({
    file: null,
    alt_text: '',
    title: '',
    description: '',
    link_url: '',
  });

  // upload image to tranding now media 
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const api = `${url}/api/v1/media/pages/home/trending/add`

    if (file) {
      setImageSendPayload((prevData) => ({
        ...prevData,
        file: file,
      }));
      setUploadedStates('loading');
      alert('wait');
      const imagePayloadToSend = new FormData();
      imagePayloadToSend.append('image', file);
      imagePayloadToSend.append('alt_text', imageSendPayload.alt_text);
      imagePayloadToSend.append('title', imageSendPayload.title);
      imagePayloadToSend.append('description', imageSendPayload.description);
      imagePayloadToSend.append('image_url', imageSendPayload.image_url);
      imagePayloadToSend.append('link_url', imageSendPayload.link_url);

      try {
        await uploadImage(imagePayloadToSend, api, setUploadedStates);
        setUploadedStates('success');
      } catch (error) {
        console.error("Image upload failed:", error);
        setUploadedStates('error');
      }

    }
  }

  const handleImageSelect = (selectedImage) => {

    // Update the specific product entry in checkCMSData for sub-images
    if (selectedImageIndex !== null) {
      setSubImagesData((prevData) => {
        const newData = [...prevData];
        newData[selectedImageIndex] = selectedImage; // Replace the existing image
        return newData;
      });

      setCheckCMSData((prevData) => ({
        ...prevData,
        [`product_${selectedImageIndex + 1}`]: selectedImage // Update specific product entry
      }));
    } else {
      // Logic for updating sliders when no selectedImageIndex is defined (if applicable)
      setCheckCMSData((prevData) => ({
        ...prevData,
        sliders: [...prevData.sliders, selectedImage] // Add new slider if needed
      }));
    }
  };

  const getTrandingNowMediaImages = async () => {
    try {
      const response = await axios.get('https://fm.skyhub.pk/api/v1/media/pages/home/trending/get');
      setMediaData(response.data.data)
    } catch (error) {
      console.error('Error', error);
    }
  }
  useEffect(() => {
    getTrandingNowMediaImages()
  }, [])

  // get cms data to check if its empty or not
  const getTrandingNowCMSData = async () => {
    try {
      const response = await axios.get('https://fm.skyhub.pk/api/v1/pages/home/trending-now/get');
      if (response.data && response.data.data) {
        setCheckCMSData(response.data.data)
      }
    } catch (error) {
      console.error("error checking cms data", error);
    }
  }

  useEffect(() => {
    getTrandingNowCMSData();
  }, []);

  // create payload to send on CMS
  const createTrandingNowCMSPayload = () => {
    const payload = {
      sliders: []
    };

    if (trandingNowMainImages.length >= 2) {
      payload.sliders = trandingNowMainImages.map((image, index) => ({
        uid: `slider-${index + 1}`,
        image_url: image.image_url,
        alt_text: image.alt_text || '',
        title: image.title || '',
        llink_url: image.link_url || '#',
        description: image.description || ''
      }));
    }

    subImagesData.forEach((item, index) => {
      if (item && item.image_url) {
        payload[`product_${index + 1}`] = {
          uid: `product-${index + 1}`,
          image_url: item.image_url,
          alt_text: item.alt_text || `Product ${index + 1}`,
          title: item.title || '',
          link_url: item.link_url || '#',
          description: item.description || '',
        }
      }
    });

    return payload
  }

  useEffect(() => {
    createTrandingNowCMSPayload();
  }, [trandingNowMainImages, subImagesData]);

  const editTrandingData = async (existingId) => {
    // Create the updated payload from current state
    const existingPayload = checkCMSData;
    const updatedPayload = createTrandingNowCMSPayload();

    // Ensure existing sliders have uids
    const existingSliders = existingPayload.sliders.map((slider, index) => ({
      ...slider,
      uid: slider.uid || `slider-${index + 1}`, // Ensure uid is present
    }));

    // Combine existing sliders with new ones
    const mergedSliders = existingSliders
      .filter(slider => !deletedImageIds.includes(slider._id)) // Exclude deleted images
      .concat(updatedPayload.sliders.map((image, index) => ({
        ...image,
        uid: `slider-${existingSliders.length + index + 1}`, // Assign new uid based on existing length
      })))
      .filter((value, index, self) =>
        index === self.findIndex((t) => (t.image_url === value.image_url))
      );

    const payloadToUpload = {
      ...existingPayload,
      sliders: mergedSliders,
      ...subImagesData.reduce((acc, item, index) => {
        if (item && item.image_url) {
          acc[`product_${index + 1}`] = {
            uid: `product-${index + 1}`,
            image_url: item.image_url,
            alt_text: item.alt_text || `Product ${index + 1}`,
            title: item.title || '',
            link_url: item.link_url || '#',
            description: item.description || '',
          };
        }
        return acc;
      }, {})

    };

    console.log("Payload to upload:", payloadToUpload);


    // Define the edit API endpoint
    const editApi = `https://fm.skyhub.pk/api/v1/pages/home/trending-now/${existingId}`;
    try {
      const response = await axios.put(editApi, payloadToUpload);
      setCheckCMSData(response.data); // Update state with the newly saved data
      getTrandingNowCMSData()
    } catch (error) {
      console.error("Updating data error", error);
    }
  };

  // send payload to cms

  const sendTrandingNowData = async (payload) => {
    const trandingNowApi = `https://fm.skyhub.pk/api/v1/pages/home/trending-now/add`;
    try {
      const response = await axios.post(trandingNowApi, payload);
    } catch (error) {
      console.error("error", error);
    }
  }

  // Call this function with the existing ID when saving
  const handleSaveClick = () => {
    const payload = createTrandingNowCMSPayload()
    if (checkCMSData && checkCMSData._id) {
      editTrandingData(checkCMSData._id);
      getTrandingNowCMSData()
    } else if (payload.sliders.length >= 2) {
      sendTrandingNowData(payload)
    } else {
      console.error("No existing ID found for update.");
    }
  };

  // handle modal open and close
  const handleModalOpen = (index = null) => {
    setSelectedImageIndex(index);
    setModalView(true);
  }

  const handleModalClose = () => {
    setModalView(false)
  }

  return (
    <div className='tranding-now-main-container'>
      <CMSHead
        heading={"Tranding Now"}
        buttonText={"Save"}
        sendImagesHomeSlider={handleSaveClick}
        handeShowInfoModal={handeShowInfoModal}
      />
      <div className='tranding-now-body-top'>
        <div className='tranding-now-body-main-container'>
          <div className='tranding-now-main-image-slider'>
            {checkCMSData &&
              checkCMSData.sliders &&
              checkCMSData.sliders.length > 0 ? (
              <div className='tranding-now-slider-container'>
                <div className='tranding-now-slider'
                  style={{
                    transform: `translateX(-${trandingNowMainImageIndex * 100}%)`,
                    transition: 'transform 0.5s ease'
                  }}
                >
                  {checkCMSData.sliders.map((image, index) => (
                    <div
                      className={`tranding-now-slide ${index === trandingNowMainImageIndex ? 'active' : ''}`}
                      key={index}
                    >
                      <div className='tranding-now-slider-body-selected-images-slider'>
                        <button
                          className='image-slider-image-delete'
                          onClick={() => handleImageDelete(image._id)}
                        /* onClick={() => handleImageDelete(image._id)} */
                        >
                          <img
                            src={crossBtn}
                            alt='delete-btn'
                          />
                        </button>
                        <img
                          src={`${url}${image.image_url}`}
                          alt={`Selected ${index + 1}`}
                          className='tranding-now-image-slider-image'
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='tranding-now-pagination-dots'>
                  <div className='pagi-dots'>
                    {checkCMSData.sliders.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${index === trandingNowMainImageIndex ? 'active' : ''}`}
                        onClick={() => setTrandingNowMainImageIndex(index)}
                      />
                    ))}
                  </div>
                  <div className='add-image-button-container'>
                    <button onClick={() => handleModalOpen(null)}>+ Add</button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className='tranding-now-main-image-upload'
                onClick={() => handleModalOpen(null)}
              >
                <img
                  src={imageUploadIcon}
                  alt='image-upload'
                />
              </div>
            )}
          </div>
          <div className='tranding-now-sub-images'>
            {checkCMSData &&
              (checkCMSData.product_1 ||
                checkCMSData.product_2 ||
                checkCMSData.product_3 ||
                checkCMSData.product_4 ||
                checkCMSData.product_5 ||
                checkCMSData.product_6) ? (
              // Display existing sub-images from checkCMSData
              // <>
              //   {Array.from({ length: 6 }).map((_, index) => {
              //     const product = checkCMSData[`product_${index + 1}`];
              //     return product ? (
              //       <div 
              //         className='sub-image-single-show' 
              //         // onClick={() => handleModalOpen(index)}
              //         key={index}>
              //         <button className='close-sub-image-btn' onClick={() => handleSubImageDelete(index)}>
              //           <img 
              //             src={crossBtn} 
              //             alt='close-sub-item' 
              //           />
              //         </button>
              //         <img 
              //           src={`${url}${product.image_url}`} 
              //           alt={product.alt_text || `Product ${index + 1}`} 
              //           className='product-sub-image' 
              //         />
              //       </div>
              //     ) : null;
              //   })}
              // </>
              <>
                {Array.from({ length: 6 }).map((_, index) => {
                  const product = checkCMSData[`product_${index + 1}`];
                  return product ? (
                    <div className='sub-image-single-show' key={index}>
                      <button className='close-sub-image-btn' onClick={() => handleSubImageDelete(index)}>
                        <img src={crossBtn} alt='close-sub-item' />
                      </button>
                      <img
                        src={`${url}${product.image_url}`}
                        alt={product.alt_text || `Product ${index + 1}`}
                        className='product-sub-image'
                      />
                    </div>
                  ) : (
                    // Show upload icon if the product is null
                    <div className='sub-image-single-show' key={index} onClick={() => handleModalOpen(index)}>
                      <img
                        src={imageUploadIcon}
                        alt={`Upload Image ${index + 1}`}
                        className='product-sub-upload-image'
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              subImagesData.map((item, index) => (
                <div
                  className={`tranding-now-sub-image-item ${item?.image_url ? 'remove-padding' : 'add-padding'}`}
                  key={index}
                  onClick={() => handleModalOpen(index)}
                >
                  {item?.image_url ? (
                    <div className='sub-image-single-show'>
                      <button className='close-sub-image-btn' onClick={() => handleSubImageDelete(index)}>
                        <img src={crossBtn} alt='close-sub-item' />
                      </button>
                      <img
                        src={`${url}${item.image_url}`}
                        alt={item?.alt_text || `Image ${index}`}
                        className='product-sub-image'
                      />
                    </div>
                  ) : (
                    <img
                      src={imageUploadIcon}
                      alt={item?.alt_text || `Image ${index}`}
                      className='product-sub-upload-image'
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ImageGalleryPopup
        showImageGalleryPopUp={modalView}
        handleModalView={handleModalClose}
        handleFileChange={handleFileChange}
        onImageSelect={handleImageSelect}
        imageSendPayload={imageSendPayload}
        data={mediaDeta}
        setImageSendPayload={setImageSendPayload}
        editGalleryImageApi={`/api/v1/media/pages/home/trending/`}
      />
      <InfoPopUp
                showInfoModal={infoModal}
                handleCloseInfoModal={handleCloseInfoModal}
            />
    </div>
  )
}

export default TrandingNow
