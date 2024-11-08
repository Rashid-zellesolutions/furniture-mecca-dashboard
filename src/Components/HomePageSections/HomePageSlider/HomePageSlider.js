import React, { useState, useEffect } from 'react'
import './HomePageSlider.css'
import axios from 'axios';

// icons and images
import loaderOne from '../../../Assets/Images/loader.gif'

// util functions
import { url } from '../../../Services/Api';
import { uploadImage } from '../../../Services/functions';

// Components
import MainLoader from '../../UI-Controls/MainLoader/MainLoader';
import CMSHead from '../../UI-Controls/CMSHead/CMSHead';
import CMSBody from '../../CMSBody/CMSBody';
import ImageGalleryPopup from '../../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup';
import InfoPopUp from '../../InfoPopUp/InfoPopUp';

const HomePageSlider = () => {

  // All States and variables here
  const [infoModal, setInfoModal] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [loading, setLoading] = useState()
  const [uploadedStatus, setUploadedStates] = useState('');
  const [selectedImage, setSelectedImage] = useState([])
  const [homeSliderImagesFromApi, setHomeSliderImagesFromApi] = useState([])
  const [combinedImages, setCombinedIMages] = useState([])
  const [deletedImagesIds, setDeletedImagesIds] = useState([])
  const [originalValues, setOriginalValues] = useState({});
  const [isEditAble, setIsEditAble] = useState(false);
  const showLoader = () => { setLoading(true) }
  const hideLoader = () => { setLoading(false) }
  // gallery modal imports
  const [data, setData] = useState([])
  // Payload to send
  const [imageSendPayload, setImageSendPayload] = useState({
    file: null,
    alt_text: '',
    title: '',
    description: '',
    link_url: '',
  })

  // Modals open and close functions
  // Gallery modal
  const handleModalOpen = () => {
    setModalView(true)
  }
  const handleModalClose = () => {
    setModalView(false)
  }

  // info modal
  const handeShowInfoModal = () => {
    setInfoModal(true)
  }
  const handleCloseInfoModal = () => {
    setInfoModal(false);
  }

  // add get and edit media functions 
  // Add Images into slider Media
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const api = `${url}/api/v1/media/pages/home/slider/add`

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
    console.log("handleChange file", file);
  }

  // get image for home slider media 
  const getApi = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/media/pages/home/slider/get`);
      setData(response.data.homeSliders)
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  useEffect(() => {
    getApi()
  }, [data])


  // get images and add into slider CMS
  // get images in homepage slider 
  const handleImageSelect = (image) => {
    setSelectedImage((prevImages) => {
      const newSelectedIMages = [...prevImages, image];
      updateCombinedImages(homeSliderImagesFromApi, newSelectedIMages);
      return newSelectedIMages;
    })
    setModalView(false);
  };

  // Get Images from api 
  const getHomeSliderImagesFRomApi = async () => {
    try {
      const response = await axios.get('https://fm.skyhub.pk/api/v1/pages/home/slider/get')
      setHomeSliderImagesFromApi(response.data.homeSliders)
      updateCombinedImages(response.data.homeSliders, selectedImage)
      // console.log("slider home appi", response)
    } catch (error) {
      console.error("error geting slider images", error);
    }
  }
  useEffect(() => {
    getHomeSliderImagesFRomApi()
  }, [])

  // set all images to combiled state 
  const updateCombinedImages = (apiImages, selectedImages) => {
    const newCombinedImages = [...apiImages, ...selectedImages];
    setCombinedIMages(newCombinedImages)
  }

  // Delete Image from temporary and api
  const handleImageDelete = (id) => {
    const existsInApiImage = homeSliderImagesFromApi.some(image => image._id === id);
    setCombinedIMages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image._id !== id);

      if (!existsInApiImage) {
        setSelectedImage((prevSelected) => prevSelected.filter(image => image._id !== id))
      }

      setDeletedImagesIds((prevDeletedIds) => {
        // Only add the ID to deletedImagesIds if it's from the API
        if (existsInApiImage && !prevDeletedIds.includes(id)) {
          return [...prevDeletedIds, id];
        }
        // If the image is temporary, don't add it to deletedImagesIds
        return prevDeletedIds;
      });

      return updatedImages;
    });
  };

  // Delete Bulk from home Slider CMS
  const deleteImagesBulk = async (ids) => {
    return axios.post(`https://fm.skyhub.pk/api/v1/pages/home/slider/delete-bulk`, ids, {
      headers: {
        'Content-Type': 'application/json', // Ensure the content type is set
      }
    });
  }

  // Add bulk 
  const sendImagesHomeSlider = async () => {
    try {
      // Filter selected images to post
      const imagesToPost = selectedImage.filter(image => !deletedImagesIds.includes(image._id));

      // Find only the IDs that need to be deleted from the API
      const apiImagesToDelete = deletedImagesIds.filter(id => homeSliderImagesFromApi.some(image => image._id === id));

      if (apiImagesToDelete.length > 0) {
        try {
          showLoader()
          await deleteImagesBulk(apiImagesToDelete);
          hideLoader()
          // showLoader(true)
        } catch (error) {
          console.error("Error during delete images from API:", error);
        }
      }

      // Proceed to post images that are not deleted
      if (imagesToPost.length > 0) {
        showLoader()
        await posImagesToHomeSlider(imagesToPost);
        hideLoader()
        // showLoader(true)
        // console.log("Selected images posted to database:", imagesToPost);
        // alert("All new images added to home slider");
      } else {
        // alert("No images to add to slider");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

  };

  // Add Bulk api call
  const posImagesToHomeSlider = async (images) => {
    const updatedImages = images.map(image => ({
      ...image,
      uid: image._id,
    }));
    return axios.post('https://fm.skyhub.pk/api/v1/pages/home/slider/add-bulk', updatedImages, {
      headers: {
        'Content-Type': 'application/json', // Ensure the content type is set
      }
    })
  }

  return (
    <div className='SlderMainSection'>
      {loading && <MainLoader loaderGif={loaderOne} />}
      <CMSHead
        heading={'Home Page Slider'}
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
        editGalleryImageApi={`/api/v1/media/pages/home/slider/`}
        handleFileChange={handleFileChange}
      />
      <InfoPopUp
        showInfoModal={infoModal}
        handleCloseInfoModal={handleCloseInfoModal}
      />
    </div>
  )
}

export default HomePageSlider

