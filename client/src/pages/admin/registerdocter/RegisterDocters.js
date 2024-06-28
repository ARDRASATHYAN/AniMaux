import React from 'react'
import RegisterDocter from '../../../components/admin/registerdoctor/RegisterDocter'
import DocterImage from '../../../components/admin/registerdoctor/DocterImage'

function RegisterDocters() {
  return (
    <div className="container py-4">
    <div className="row g-0 align-items-center">
        <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
            <DocterImage />
        </div>
        <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
            <RegisterDocter/>
        </div>
    </div>
</div>
  )
}

export default RegisterDocters
