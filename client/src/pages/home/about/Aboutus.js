import React from 'react'
import About from '../../../components/home/about/About'
import AboutImage from '../../../components/home/about/AboutImage'
import'./aboutstyle.css'
import Navbar from '../../../components/home/navbar/Navbar'

function Aboutus() {
  return (
    <>
    <Navbar/>
   
      <div id="about" className="about-box" >
      <div className="about-a1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-box">
                <h2>ABOUT US</h2>
               
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="row align-items-center about-main-info">
                <div className="col-lg-6 col-md-6 col-sm-12">
<About/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
<AboutImage/>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                <hr/>
               
    </>
  )
}

export default Aboutus
