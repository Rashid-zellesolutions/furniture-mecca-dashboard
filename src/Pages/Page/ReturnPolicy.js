import React, { useState } from 'react';
import './GeneralPage.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ReturnPolicy = () => {
  const [rPolicyData, setRPolicyData] = useState('');

  return (
    <div className="ReturnPolicyMainPage">
      <div className="ReturnPolicy-Section">
        <div className="Policy-Editor">
          <CKEditor
            editor={ClassicEditor}
            data={rPolicyData}
            config={{
              placeholder: 'Elevate your bedroom with the Cypress Bedroom Set in Gray...',
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setRPolicyData(data); // Update state here
              console.log({ data });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;