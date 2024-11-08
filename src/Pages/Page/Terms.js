import React, { useState } from 'react';
import './GeneralPage.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TermsConditions = () => {
  const [tConditionData, setTConditionData] = useState('');

  return (
    <div className="TermsConditionMainPage">
      <div className="TermsCondition-Section">
        <div className="Policy-Editor">
          <CKEditor
            editor={ClassicEditor}
            data={tConditionData}
            config={{
              placeholder: 'Elevate your bedroom with the Cypress Bedroom Set in Gray...',
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setTConditionData(data); // Update state here
              console.log({ data });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;