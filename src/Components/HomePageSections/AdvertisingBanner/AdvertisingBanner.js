import React, {useEffect, useState} from 'react'
import './AdvertisingBanner.css'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead'
import uploadImageIcon from '../../../Assets/Images/uploadImg 48 x 48.png'
import ImageGalleryPopup from '../../UI-Controls/PopUp/ImageGalleryPapup/ImageGalleryPopup'
import InfoPopUp from '../../InfoPopUp/InfoPopUp'

const AdvertisingBanner = () => {
  const [modalView, setModalView] = useState(false);
  const [bannerHeading, setBannerHeading] = useState('')
  const [selectedImage, setSelectedImage] = useState([])
  const [bannerData, setBannerData] = useState([])
  const [infoModal, setInfoModal] = useState(false);
  // Gallery modal
  const handleModalOpen = () => {
    setModalView(true)
  }
  const handleModalClose = () => {
    setModalView(false)
  }
  // Modal open and close functions
    const handeShowInfoModal = () => {
        setInfoModal(true)
    }
    const handleCloseInfoModal = () => {
        setInfoModal(false);
    }

  // get images in homepage slider 
  const handleImageSelect = (image) => {
    setSelectedImage((prevImages) => {
      const newSelectedIMages = [...prevImages, image];
      return newSelectedIMages;
    })
    setModalView(false);
  };

  useEffect(() => {
    setBannerData({
      bannerTitle: bannerHeading,
      bannerImage: selectedImage
    })
    console.log("Banner Data", bannerData)
  }, [bannerHeading, selectedImage.image_url])
  useEffect(() => {
    
  }, [bannerData])

  return (
    <div>
        <CMSHead 
            heading={bannerHeading.length > 0 ?  bannerHeading : "Advertising Banner"}
            buttonText={"Save"}
            handeShowInfoModal={handeShowInfoModal}
        />
        <div className='advertising-banner-body-main'>
            <div className='advertising-banner-containt'>
              <div className='advertising-banner-name-input'>
                <input 
                  type='text' 
                  placeholder='Title'
                  value={bannerHeading}
                  onChange={(e) => setBannerHeading(e.target.value)} 
                />
              </div>
              <div className='advertising-banner-upload-main-container'>
                <div className='advertising-banner-image-upload-div' onClick={handleModalOpen}>
                  <img src={uploadImageIcon} alt='upload image' />
                </div>
              </div>
            </div>
        </div>
        <ImageGalleryPopup
        showImageGalleryPopUp={modalView}
        handleModalView={handleModalClose}
        onImageSelect={handleImageSelect}
        // imageSendPayload={imageSendPayload}
        // setImageSendPayload={setImageSendPayload}
        // alt_text={imageSendPayload.alt_text}
        // title={imageSendPayload.title}
        // data={data}
        // handleFileChange={handleFileChange}
      /> 
      <InfoPopUp
                showInfoModal={infoModal}
                handleCloseInfoModal={handleCloseInfoModal}
            />
    </div>
  )
}

export default AdvertisingBanner
