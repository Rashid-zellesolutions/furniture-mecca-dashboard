import React, { useState, useEffect } from 'react';
import './FinanceSlider.css';
import CMSHead from '../../UI-Controls/CMSHead/CMSHead';
import CMSBody from '../../CMSBody/CMSBody';
import ImageGalleryPopup from '../../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup';
import InfoPopUp from '../../InfoPopUp/InfoPopUp';
import axios from 'axios';
import { url } from '../../../Services/Api';
import { uploadImage } from '../../../Services/functions';
import loaderTwo from '../../../Assets/Images/loader-check-one.gif'
import MainLoader from '../../UI-Controls/MainLoader/MainLoader';

const FinanceSlider = () => {
  const [infoModal, setInfoModal] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [uploadedStatus, setUploadedStates] = useState('');
  const [selectedImage, setSelectedImage] = useState([]);
  const [homeSliderImagesFromApi, setHomeSliderImagesFromApi] = useState([]);
  const [combinedImages, setCombinedImages] = useState([]); // Fixed typo in state variable name
  const [data, setData] = useState([]);
  const [deletedImagesIds, setDeletedImagesIds] = useState([]);
  const [loader, setLoader] = useState(false);
  const showLoader = () => { setLoader(true) }
  const hideLoader = () => { setLoader(false) }

  const [imageSendPayload, setImageSendPayload] = useState({
    image_url: '',
    alt_text: '',
    title: '',
    description: '',
    link_url: '',
  });
// Modal open and close functions
  const handleModalOpen = () => {
    setModalView(true);
  };

  const handleModalClose = () => {
    setModalView(false);
  };
  
    const handeShowInfoModal = () => {
        setInfoModal(true)
    }
    const handleCloseInfoModal = () => {
        setInfoModal(false);
    }

  // Get Finance Slider Media api
  const getApi = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/media/pages/home/finance/get`)
      setData(response.data.homeFinanceSliders)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getApi();
  }, [data]);

  // Get images for finance slider
  const getHomeSliderImagesFromApi = async () => {
    try {
      const response = await axios.get('https://fm.skyhub.pk/api/v1/pages/home/finance-slider/get');
      const { homeSliders } = response.data;
      setHomeSliderImagesFromApi(homeSliders);
      updateCombinedImages(homeSliders, selectedImage);
    } catch (error) {
      console.error("Error getting slider images:", error);
    }
  };

  useEffect(() => {
    getHomeSliderImagesFromApi();
  }, []);

  const handleImageSelect = (image) => {
    setSelectedImage((prevImages) => {
      const newSelectedImages = [...prevImages, image];
      updateCombinedImages(homeSliderImagesFromApi, newSelectedImages);
      return newSelectedImages;
    });
    setModalView(false);
  };

  // handleFilleChange
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const api = `${url}/api/v1/media/pages/home/finance/add`

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

      await uploadImage(imagePayloadToSend, api, setUploadedStates)

    }
  }


  const updateCombinedImages = (apiImages, selectedImages) => {
    const newCombinedImages = [...apiImages, ...selectedImages];
    setCombinedImages(newCombinedImages); // Fixed typo in state variable name
  };

  const handleImageDelete = (id) => {
    const existsInApiImage = homeSliderImagesFromApi.some(image => image._id === id);
    setCombinedImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image._id !== id);

      if (!existsInApiImage) {
        setSelectedImage((prevSelected) => prevSelected.filter(image => image._id !== id));
      }

      setDeletedImagesIds((prevDeletedIds) => {
        if (existsInApiImage && !prevDeletedIds.includes(id)) {
          return [...prevDeletedIds, id];
        }
        return prevDeletedIds;
      });

      return updatedImages;
    });
  };

  const sendImagesHomeSlider = async () => {
    showLoader()
    try {
      const imagesToPost = selectedImage.filter(image => !deletedImagesIds.includes(image._id));
      const apiImagesToDelete = deletedImagesIds.filter(id => homeSliderImagesFromApi.some(image => image._id === id));

      if (apiImagesToDelete.length > 0) {
        try {
          showLoader()
          await deleteImagesBulk(apiImagesToDelete);
          hideLoader()
        } catch (error) {
          console.error("Error deleting images from API:", error); // Added error log
        }
      }

      if (imagesToPost.length > 0) {
        showLoader()
        await posImagesToHomeSlider(imagesToPost);
        hideLoader()
        alert("All new images added to home slider");
      } else {
        alert("No images to add to slider");
      }
    } catch (error) {
      console.error("Error sending data:", error); // Added error log
    }
  };

  const deleteImagesBulk = async (ids) => {
    return axios.post(`https://fm.skyhub.pk/api/v1/pages/home/finance-slider/delete-bulk`, ids, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const posImagesToHomeSlider = async (images) => {

    const updatedImages = images.map(image => ({
      ...image,
      uid: image._id,
    }));

    // console.log("Sending images to API:", JSON.stringify(updatedImages, null, 2)); 

    try {
      const response = await axios.post('https://fm.skyhub.pk/api/v1/pages/home/finance-slider/add-bulk', updatedImages, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log("Response from API:", response.data); 
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Error sending images to API:", error); // Log any errors
      throw error; // Re-throw the error if you want to handle it further up the call stack
    }
  };


  return (
    <div className='FinanceSlider'>
      {loader && <MainLoader loaderGif={loaderTwo} />}
      <CMSHead
        heading={'Finance Slider'}
        buttonText={'Save'}
        sendImagesHomeSlider={sendImagesHomeSlider}
        handeShowInfoModal={handeShowInfoModal}
      />
      <CMSBody
        bodyText={'Upload Image'}
        selectedImage={combinedImages}
        handleModalOpen={handleModalOpen}
        handleImageDelete={handleImageDelete}
        setModalView={setModalView}
      />
      <ImageGalleryPopup
        showImageGalleryPopUp={modalView}
        handleModalView={handleModalClose}
        onImageSelect={handleImageSelect}
        imageSendPayload={imageSendPayload}
        setImageSendPayload={setImageSendPayload}
        alt_text={imageSendPayload.alt_text}
        title={imageSendPayload.title}
        data={data}
        handleFileChange={handleFileChange}
        editGalleryImageApi={`/api/v1/media/pages/home/finance/`}
      />
      <InfoPopUp
        showInfoModal={infoModal}
        handleCloseInfoModal={handleCloseInfoModal}
      />
    </div>
  );
};

export default FinanceSlider;
