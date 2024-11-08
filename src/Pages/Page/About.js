import React, { useState, useEffect, useRef } from 'react';
import '../Page.css'; // Import the CSS file
import '../ECommerce/ECommerce.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomBtn from '../../Components/UI-Controls/Buttons/Btn';
import uploadIcon from '../../Assets/Images/uploadImg 48 x 48.png';

const AboutPage = () => {
  const [tConditionData, setTConditionData] = useState('');
  const [abouttypeimage, setAboutTypeImage] = useState(null);
  const [imageBinaryData, setImageBinaryData] = useState(null); // Binary data for the image

  const cancelAboutTypeImage = () => {
    setAboutTypeImage(null);
    setImageBinaryData(null); // Clear the binary data when canceling the image
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAboutTypeImage(URL.createObjectURL(file)); // Set the image preview
      const reader = new FileReader();
      reader.readAsArrayBuffer(file); // Read file as binary ArrayBuffer
      reader.onloadend = () => {
        setImageBinaryData(reader.result); // Save binary data in state
      };
    }
  };

  // const handleSubmit = () => {
  //   const formData = new FormData();
  //   formData.append('content', tConditionData);
  //   formData.append('image', new Blob([imageBinaryData]), 'image.jpg'); // Add binary data as BLOB

  //   fetch('/api/upload', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log('Submission response:', data))
  //     .catch((error) => console.error('Error:', error));
  // };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('content', tConditionData);
    formData.append('image', new Blob([imageBinaryData]), 'image.jpg'); // Add binary data as BLOB
  
    // Log each entry in FormData to the console
    for (const [key, value] of formData.entries()) {
      if (key === 'image') {
        console.log(`${key}:`, value, `(Type: ${value.type}, Size: ${value.size} bytes)`);
      } else {
        console.log(`${key}:`, value);
      }
    }
  };

  
  return (
    <div className="AboutMainPage">
      <div className="AboutSection-01">
        <div className="Row-01">
          <span>Who we are</span>
        </div>
        <div className="Row-02">
          <div className="Leftside">
            <div className="MainContainer">
              <span className="AboutusLabel">Banner Image</span>
              <div className="SubmitBtn">
                <CustomBtn
                  label="Save"
                  className="AddAboutBtn"
                  onClick={handleSubmit}
                  type="button"
                />
              </div>
            </div>
            <div className="BodyContainer">
              <label style={labelStyle}>
                Upload Image<span className="superscript">*</span>
              </label>
              <div className="banner-upload">
                {abouttypeimage ? (
                  <div className="image-preview-wrapper">
                    <img src={abouttypeimage} alt="Banner" className="image-preview" />
                    <button onClick={cancelAboutTypeImage} className="cancel-button">
                      X
                    </button>
                  </div>
                ) : (
                  <label htmlFor="abouttypeImage" className="upload-label">
                    <div className="Aboutupload-button">
                      <img src={uploadIcon} alt="" className="uploaded-image" id="uploaded-image-1" />
                    </div>
                  </label>
                )}
                <input
                  type="file"
                  id="abouttypeImage"
                  name="image"
                  className="upload-input"
                  accept="image/*"
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
          <div className="Rightside">
            <CKEditor
              editor={ClassicEditor}
              data={tConditionData}
              config={{ placeholder: 'Elevate your bedroom with the Cypress Bedroom Set in Gray...' }}
              onChange={(event, editor) => {
                setTConditionData(editor.getData());
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const labelStyle = {
  lineHeight: '18px',
  color: 'var(--text-color)',
  fontFamily: 'var(--font-family)',
  fontWeight: 'var(--font-weight-semi-bold)',
  fontSize: 'var(--font-size-large)',
  marginBottom: '5px',
  marginLeft: '5px',
  display: 'block',
};

export default AboutPage;
