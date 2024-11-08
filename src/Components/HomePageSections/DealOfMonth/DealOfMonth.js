import React, {useRef, useState} from 'react'
import './DealOfMonth.css'
import CMSHead from '../../UI-Controls/CMSHead/CMSHead'
import timeIcon from '../../../Assets/Images/time-icon.png';
import InfoPopUp from '../../InfoPopUp/InfoPopUp';


const DealOfMonth = () => {
  const timePickerRef = useRef(null)
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [infoModal, setInfoModal] = useState(false);

   // Modal open and close functions
    const handeShowInfoModal = () => {
        setInfoModal(true)
    }
    const handleCloseInfoModal = () => {
        setInfoModal(false);
    }

  const handleTimeClick = () => {
    setShowDatePicker(prev => !prev); // Toggle time picker visibility
    if (showDatePicker && timePickerRef.current) {
      timePickerRef.current.showPicker();
    }
  }

  return (
    <div>
      <CMSHead 
            heading={"Deal Of The Month"}
            buttonText={"Save"}
            handeShowInfoModal={handeShowInfoModal}
        />
        <div className='deal-of-the-month-main-container'>
            <div className='deal-of-the-month-inputs'>
                <div className='select-date' onClick={handleTimeClick}>
                  <p>Ending Date</p>
                  <img src={timeIcon} alt='time-icon' />
                  <input type='date' ref={timePickerRef} style={{display: 'none'}} />
                </div>
                <div className='select-date'>
                  <p>Ending Time</p>
                  <img src={timeIcon} alt='time-icon' />
                </div>
            </div>
        </div>
        <InfoPopUp
                showInfoModal={infoModal}
                handleCloseInfoModal={handleCloseInfoModal}
            />
    </div>
  )
}

export default DealOfMonth
