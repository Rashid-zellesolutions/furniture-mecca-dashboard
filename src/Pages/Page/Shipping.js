import React, { useState } from 'react';
import './GeneralPage.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ShippingDelivery = () => {
  const [sDeliveryData, setSDeliveryData] = useState('');

  return (
    <div className="ShippingDeliveryMainPage">
      <div className="ShippingDelivery-Section">
        <div className="Policy-Editor">
          <CKEditor
            editor={ClassicEditor}
            data={sDeliveryData}
            config={{
              placeholder: 'Elevate your bedroom with the Cypress Bedroom Set in Gray...',
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setSDeliveryData(data); // Update state here
              console.log({ data });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingDelivery;