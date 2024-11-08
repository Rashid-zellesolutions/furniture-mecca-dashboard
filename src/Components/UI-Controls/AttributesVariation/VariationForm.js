// import React from 'react';
// import Dropdowncustom from '../Dropdown/dropdownaddgeneral1';
// import "../../../Pages/ECommerce/ECommerce.css";
// import uploadIcon from '../../../assets/upload-icon.png';

// const VariationForm = ({
//   SaleOptions,
//   taxTypeOptions,
//   taxClassOptions,
//   handleChangeSale,
//   handleChangeTaxStatus,
//   handleChangeTaxClass,
//   selectedSale,
//   selectedTaxStatus,
//   selectedTaxClass,
// }) => (
//   <div className='Content-GeneralFields'>
//     <div className='GeneralFields-Data'>
//       <label htmlFor="singleImg" className='Data-Label'>Add Single Image</label>

//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="additionalImg" className='Data-Label'>Add Additional Image</label>

//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="productName" className='Data-Label'>Regular Price ($)</label>
//       <input type="text" id="productName" name="productName" className='Data-Field' placeholder='$' />
//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="salePrice" className='Data-Label'>Sale Price</label>
//       <Dropdowncustom
//         options={SaleOptions}
//         selected={selectedSale}
//         onChange={handleChangeSale}
//         dropdownClass="custom-dropdown-sale"
//         size={15}
//       />
//       <input type="text" id="salePrice" name="salePrice" className='Data-Field-Sale' placeholder='$' />
//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="dateRange" className='Data-Label'>Date Range</label>
//       <input type="text" id="dateRange" name="dateRange" className='Data-Field' />
//     </div>

//     <div className='GeneralFields-Data empty-space'>
//       <label htmlFor="schedule" className='Data-Label label-schadule'></label>
//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="taxStatus" className='Data-Label'>Tax Status</label>
//       <Dropdowncustom
//         options={taxTypeOptions}
//         selected={selectedTaxStatus}
//         onChange={handleChangeTaxStatus}
//         dropdownClass="custom-dropdown-tax"
//       />
//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="taxClass" className='Data-Label'>Tax Class</label>
//       <Dropdowncustom
//         options={taxClassOptions}
//         selected={selectedTaxClass}
//         onChange={handleChangeTaxClass}
//         dropdownClass="custom-dropdown-tax"
//       />
//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="brand" className='Data-Label'>Brand</label>
//       <input type="text" id="brand" name="brand" className='Data-Field' placeholder='Text Field' />
//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="stockStatus" className='Data-Label'>Stock Status</label>
//       <Dropdowncustom
//         options={taxClassOptions}
//         selected={selectedTaxClass}
//         onChange={handleChangeTaxClass}
//         dropdownClass="custom-dropdown-tax"
//       />
//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="gtin" className='Data-Label'>GTIN</label>
//       <input type="text" id="gtin" name="gtin" className='Data-Field' placeholder='Text Field' />
//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="ean" className='Data-Label'>EAN</label>
//       <input type="text" id="ean" name="ean" className='Data-Field' placeholder='Text Field' />
//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="mpn" className='Data-Label'>MPN</label>
//       <input type="text" id="mpn" name="mpn" className='Data-Field' placeholder='Text Field' />
//     </div>

//     <div className='GeneralFields-Data'>
//       <label htmlFor="excludeFromFeed" className='Data-Label'>Exclude From Feed</label>
//       <input type="checkbox" id="excludeFromFeed" name="excludeFromFeed" className='Data-Checkbox' />
//     </div>
//   </div>
// );

// export default VariationForm;

import React, { useState, useEffect } from 'react';
import Dropdowncustom from '../Dropdown/dropdownaddgeneral1';
import "../../../Pages/ECommerce/ECommerce.css";
import uploadIcon from '../../../../src/Assets/Images/uploadImg 48 x 48.png';
import ImageGalleryPopup from '../PopUp/ImageGalleryPapup/ImageGalleryPopup';
import { url } from '../../../Services/Api';
import { uploadImage } from '../../../Services/functions';
import axios from 'axios';

const VariationForm = ({
  SaleOptions,
  taxTypeOptions,
  taxClassOptions,
  handleChangeSale,
  handleChangeTaxStatus,
  handleChangeTaxClass,
  selectedSale,
  selectedTaxStatus,
  selectedTaxClass,
}) => {
  const [singleImage, setSingleImage] = useState(null);
  const [additionalImage, setAdditionalImage] = useState(null);
  const [imageType, setImageType] = useState(null);



  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSingleImage(URL.createObjectURL(file));
    }
  };




  const handleAdditionalImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdditionalImage(URL.createObjectURL(file));
    }
  };

  const removeSingleImage = () => {
    setSingleImage(null);
  };

  const removeAdditionalImage = () => {
    setAdditionalImage(null);
  };

  //Image Gallery Script

  // image gallery pop up state variables
  const [modalView, setModalView] = useState(false);
  const [data, setData] = useState([])
  const [isUploaded, setIsUploaded] = useState(false)
  const [selectedImage, setSelectedImage] = useState([])
  const [productImagesFromApi, setProductImagesFromApi] = useState([])
  const [combinedImages, setCombinedIMages] = useState([])
  const [uploadedStatus, setUploadedStates] = useState('');
  const [imageSendPayload, setImageSendPayload] = useState({
    file: null,
    alt_text: '',
    title: '',
    description: '',
    link_url: '',
  })

  // image galley pop up functions
  const handleModalOpen = (type) => {
    setImageType(type)
    setModalView(true);
  }
  const handlePopupClose = (e) => {
    e.preventDefault(); // Prevents the form from submitting
    setModalView(false);
    console.log("handle close clicked");
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const api = `${url}/api/v1/media/products/add`

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
    setIsUploaded(true)
  }

  // get image for Product Popup media 
  const getApi = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/media/products/get`);
      setData(response.data.media)
      console.log("product media get respponse: ", response.data.media)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getApi()
  }, [])
  useEffect(() => {
    if(isUploaded){
      getApi()
      setIsUploaded(false)
    }
  }, [isUploaded])

  // get images in homepage slider 
  const handleImageSelect = (image) => {
    if(imageType === 'single'){
      setSingleImage(image);
      console.log("if single image clicked", singleImage);
    }else if(imageType === 'additional'){
      setAdditionalImage(image);
      console.log('if additional image', additionalImage)
    }
    // setSelectedImage((prevImages) => {
    //   const newSelectedIMages = [...prevImages, image];
    //   if(imageType === 'single'){
    //     setSingleImage(newSelectedIMages)
    //     console.log("Single Image", singleImage)
    //   }else if(imageType === 'additional'){
    //     setAdditionalImage(newSelectedIMages)
    //     console.log('additional image state', additionalImage)
    //   }
    //   return newSelectedIMages;
    // })
    setModalView(false);
  };
  
// console.log("Single Image", singleImage)
  return (
    <div className='Content-GeneralFields'>
      {/* Add Single Image */}
      <div className='GeneralFields-VariationData'>
        <label htmlFor="singleImg" className='VariationData-Label'>Add Single Image</label>
        <div className="banner-upload">
          {singleImage ? (
            <div className="image-preview-wrapper">
              <img src={singleImage} alt="Single Preview" className="image-preview" />
              <button onClick={removeSingleImage} className="cancel-button">X</button>
            </div>
          ) : (
            <label htmlFor="singleImg" className="uploadAdd-label" onClick={() => handleModalOpen('single')}>
              <div className="Addupload-button">
                <img src={uploadIcon} alt="" className="uploaded-image" />
                <span className="uploadAdd-text">Click to Upload Image</span>
              </div>
            </label>
          )}

          {/* <input
            type="file"
            id="singleImg"
            name="singleImg"
            className="upload-input"
            accept="image/*"
            onChange={handleSingleImageChange}
            style={{ display: 'none' }}
          /> */}
        </div>
        <ImageGalleryPopup
          showImageGalleryPopUp={modalView}
          handleModalView={handlePopupClose}
          handleFileChange={handleFileChange}
          onImageSelect={handleImageSelect}
          imageSendPayload={imageSendPayload}
          setImageSendPayload={setImageSendPayload}
          alt_text={imageSendPayload.alt_text}
          title={imageSendPayload.title}
          data={data}
        />
      </div>

      {/* Add Additional Image */}
      <div className='GeneralFields-VariationData'>
        <label htmlFor="additionalImg" className='VariationData-Label'>Add Additional Image</label>
        <div className="banner-upload">
          {additionalImage ? (
            <div className="image-preview-wrapper">
              <img src={additionalImage} alt="Additional Preview" className="image-preview" />
              <button onClick={removeAdditionalImage} className="cancel-button">X</button>
            </div>
          ) : (
            <label htmlFor="additionalImg" className="uploadAdd-label" onClick={() => handleModalOpen('additional')}>
              <div className="Addupload-button">
                <img src={uploadIcon} alt="" className="uploaded-image" />
                <span className="uploadAdd-text">Click to Upload Image</span>
              </div>
            </label>
          )}
          {/* <input
            type="file"
            id="additionalImg"
            name="additionalImg"
            className="upload-input"
            accept="image/*"
            onChange={handleAdditionalImageChange}
            style={{ display: 'none' }}
          /> */}
        </div>
      </div>

      {/* Regular Price */}
      <div className='GeneralFields-Data-Var'>
        <label htmlFor="productName" className='Data-Label'>Regular Price ($)</label>
        <input type="text" id="productName" name="productName" className='VariationData-Field' placeholder='$' />
      </div>

      {/* Sale Price */}
      <div className='GeneralFields-Data-Var'>
        <label htmlFor="salePrice" className='Data-Label'>Sale Price</label>
        <Dropdowncustom
          options={SaleOptions}
          selected={selectedSale}
          onChange={handleChangeSale}
          dropdownClass="custom-dropdown-sale"
          size={15}
        />
        <input type="text" id="salePrice" name="salePrice" className='Data-Field-Sale' placeholder='$' />
      </div>

      {/* Date Range */}
      <div className='GeneralFields-Data-Var'>
        <label htmlFor="dateRange" className='Data-Label'>Date Range</label>
        <input type="text" id="dateRange" name="dateRange" className='Data-Field' />
      </div>

      {/* Tax Status */}
      <div className='GeneralFields-Data-Var'>
        <label htmlFor="taxStatus" className='Data-Label'>Tax Status</label>
        <Dropdowncustom
          options={taxTypeOptions}
          selected={selectedTaxStatus}
          onChange={handleChangeTaxStatus}
          dropdownClass="custom-dropdown-tax"
          size={15}
        />
      </div>

      {/* Tax Class */}
      <div className='GeneralFields-Data-Var'>
        <label htmlFor="taxClass" className='Data-Label'>Tax Class</label>
        <Dropdowncustom
          options={taxClassOptions}
          selected={selectedTaxClass}
          onChange={handleChangeTaxClass}
          dropdownClass="custom-dropdown-tax"
          size={15}
        />
      </div>

      {/* Other Fields */}
      <div className='GeneralFields-Data-Var'>
        <label htmlFor="brand" className='Data-Label'>Brand</label>
        <input type="text" id="brand" name="brand" className='Data-Field' placeholder='Text Field' />
      </div>

      {/* Additional Inputs */}
      <div className='GeneralFields-Data-Var'>
        <label htmlFor="stockStatus" className='Data-Label'>Stock Status</label>
        <Dropdowncustom
          options={taxClassOptions}
          selected={selectedTaxClass}
          onChange={handleChangeTaxClass}
          dropdownClass="custom-dropdown-tax"
          size={15}
        />
      </div>

      <div className='GeneralFields-Data-Var'>
        <label htmlFor="gtin" className='Data-Label'>GTIN</label>
        <input type="text" id="gtin" name="gtin" className='Data-Field' placeholder='Text Field' />
      </div>

      <div className='GeneralFields-Data-Var'>
        <label htmlFor="ean" className='Data-Label'>EAN</label>
        <input type="text" id="ean" name="ean" className='Data-Field' placeholder='Text Field' />
      </div>

      <div className='GeneralFields-Data-Var'>
        <label htmlFor="mpn" className='Data-Label'>MPN</label>
        <input type="text" id="mpn" name="mpn" className='Data-Field' placeholder='Text Field' />
      </div>

      <div className='GeneralFields-Data-Var'>
        <label htmlFor="excludeFromFeed" className='Data-Label'>Exclude From Feed</label>
        <input type="checkbox" id="excludeFromFeed" name="excludeFromFeed" className='Data-Checkbox' />
      </div>
    </div>
  );
};

export default VariationForm;
