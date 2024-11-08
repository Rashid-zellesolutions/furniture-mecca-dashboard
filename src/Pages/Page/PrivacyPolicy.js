import React, { useState } from 'react';
import './GeneralPage.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PrivacyPolicy = () => {
  const [pPolicyData, setPPolicyData] = useState('');

  return (
    <div className="PrivacyPolicyMainPage">
      <div className="PrivacyPolicy-Section">
        <div className="Policy-Editor">
          <CKEditor
            editor={ClassicEditor}
            data={pPolicyData}
            config={{
              placeholder: 'Elevate your bedroom with the Cypress Bedroom Set in Gray...',
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setPPolicyData(data); // Update state here
              console.log({ data });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;