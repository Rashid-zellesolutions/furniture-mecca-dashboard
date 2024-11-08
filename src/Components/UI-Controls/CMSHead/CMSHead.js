import React from 'react'
import './CMSHead.css'
import explanationMark from '../../../Assets/Images/Frame.png';
import eyeIcon from '../../../Assets/Images/hide-show.png'

const CMSHead = ({ handeShowInfoModal, sendImagesHomeSlider, heading, buttonText }) => {
  return (
    <div className='SliderHead'>
      <div className='SliderHeadLeft'>
        <h3>{heading}</h3>
        <img src={explanationMark} alt='img' onClick={handeShowInfoModal} />
      </div>
      <div className='SliderHeadRight'>
        <img src={eyeIcon} alt='hide-show' />
        <button className='SliderAddAndSaveBtn' onClick={sendImagesHomeSlider}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default CMSHead
