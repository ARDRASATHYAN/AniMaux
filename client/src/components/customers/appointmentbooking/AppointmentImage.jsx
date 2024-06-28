import React from 'react'

import dogImage from './images/pet2.jpg';

function AppointmentImage() {
  return (
    <>
            <img
                src={dogImage}
                className="w-100  shadow-4"
                alt="" style={{ height: '950px', width: '807px' }}
            />
            {/* <img src={dogImage} className="img-responsive" alt="" style={{ height: '848px', width: '807px', marginLeft: '0px', marginRight: '50px' }} /> */}
        </>
  )
}

export default AppointmentImage
