import React, {useState} from 'react'
import './Categorydescription.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import uploadImageIcon from '../../../Assets/Images/uploadImg 48 x 48.png'

import CMSHead from '../../UI-Controls/CMSHead/CMSHead';

const CategoryDescription = () => {
const [editorContent, setEditorContent] = useState(''); // To store text editor content
  const [editorData, setEditorData] = useState('')
  return (
    <div className='category-description-main-section'>
        <CMSHead 
            heading={'Category Description'}
            buttonText={'Save'}
        />
        <div className='category-description-body'>
            <div className='category-editer-section'>
                <div className="custom-editor">
              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                config={{
                  placeholder: 'Elevate your bedroom with the Cypress Bedroom Set in Gray, a stunning blend of modern sophistication and timeless charm. The sleek gray finish effortlessly complements various interior styles, making it a versatile addition to any space. The set includes a beautifully designed bed, a spacious dresser, a stylish mirror, and a practical nightstand, offering both functionality and aesthetic appeal. Elevate your bedroom with the Cypress Bedroom Set in Gray, a stunning blend of modern sophistication and timeless charm. The sleek gray finish effortlessly complements various interior styles, making it a versatile addition to any space. The set includes a beautifully designed bed, a spacious dresser, a stylish mirror, and a practical nightstand, offering both functionality and aesthetic appeal.', // Set the placeholder text here
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ data });
                  // Handle data change (e.g., setState)
                }}
              />
            </div>
            </div>
            <div className='category-heading-image-upload-section'>
                <p>Upload 10 Images</p>
                <div className='category-description-upload-image'>
                    <img src={uploadImageIcon} alt='upload-image-icon' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryDescription
