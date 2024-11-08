import React from 'react'
import './InputField.css'

const InputField = ({
    labelText, 
    type, 
    placeholder, 
    color, 
    fontSize, 
    fontWeight, 
    lineHeight,
    value,
    name,
    onChange,
    readOnly
}) => {

  return (
    <div className='input-field-with-label'>
        <label
            style={{color: color, fontSize: fontSize, fontWeight: fontWeight, lineHeight: lineHeight}}
        >
            {labelText}
        </label>
        <input 
            type={type} 
            placeholder={placeholder}
            value={value} 
            name={name}
            onChange={onChange}
            readOnly={readOnly}
             />
    </div>
  )
}

export default InputField
