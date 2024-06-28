import React from 'react'
import Petimagesection from '../../../components/customers/addpet/Petimagesection'
import AddPet from './../../../components/customers/addpet/AddPet';
import Navbar from '../../../components/home/navbar/Navbar';




function AddPets() {
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
            <Petimagesection />
          </div>
          <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
            <AddPet />
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPets
