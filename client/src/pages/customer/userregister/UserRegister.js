import React from 'react'
import Imagesection from '../../../components/customers/registeration/Imagesection'
import UserRegisteration from '../../../components/customers/registeration/UserRegisteration'
import Navbar from '../../../components/home/navbar/Navbar'

function UserRegister() {
  return (
    <>
      <Navbar />
      <div className="container py-4  hello">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
            <Imagesection />
          </div>
          <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
            <UserRegisteration />
          </div>
        </div>
      </div>

    </>
  )
}

export default UserRegister
