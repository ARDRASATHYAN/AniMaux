import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../../components/home/navbar/Navbar'

function Servies() {
  const [user,setUser] =useState([])
  useEffect(()=>{
    axios.get('http://localhost:4000/service/viewservices').then((response)=>{
      console.log(response);
      setUser(response.data.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <>
    <Navbar/>
    
    <div className="">  {/* Start Services */}
  <div id="services" className="services-box "  style={{minHeight:'100vh'}}>

    <div className="container" >
      <div className="row">
        <div className="col-lg-12">
          <div className="title-box">
            <h2>Services</h2>
           
          </div>
        </div>
      </div>

            <div className="item">

            <div className="row">
            {user.map((data,key)=>(
             
               <div className="col-lg-3">
              <div className="serviceBox">
                <div className="service-icon">
                  <i className="fa fa-h-square" aria-hidden="true" />
                </div>
                <h3 className="title">{data.services}</h3>
                <p className="description">
                  {data.description}.
                </p> 
                
                
              </div>
              </div>
            ))}
           
           
             
               {/* <div className="col-lg-3">
              <div className="serviceBox">
                <div className="service-icon">
                  <i className="fa fa-h-square" aria-hidden="true" />
                </div>
                <h3 className="title">servies</h3>
                <p className="description">
                 description
                </p> 
                
                
              </div>
              </div> */}
          
           
            
            </div>
           
          </div>
        </div>
        </div>
      </div>
      <hr/>
    
</>

  )
}

export default Servies
