import React from 'react'
import Navbar from '../../../components/home/navbar/Navbar'
import HomeSlider from '../../../components/home/slider/HomeSlider'
import Servies from '../servies/Servies'
import Aboutus from '../about/Aboutus'
import OurDocters from '../docter/OurDocters'
import Footer from '../footer/Footer'
// import'./style/homestyle.css';

function Home() {
  return (
    <>
    <div >
    <Navbar/>
 
    <HomeSlider/>
 
    <Servies/>
 
 
    <Aboutus/>
 
    <OurDocters/>
    <Footer/>
  </div>
  
      
    </>
  )
}

export default Home
