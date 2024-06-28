import React from 'react'
import AppointmentImage from '../../../components/customers/appointmentbooking/AppointmentImage'
import AppointmentBooking from '../../../components/customers/appointmentbooking/AppointmentBooking'
import Navbar from '../../../components/home/navbar/Navbar'

function AppointmentRegister() {
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
            <AppointmentImage />
          </div>
          <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
            <AppointmentBooking />
          </div>
        </div>
      </div>
    </>
  )
}

export default AppointmentRegister
