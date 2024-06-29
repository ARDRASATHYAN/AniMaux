import React, { useEffect, useState } from 'react'
import './style/docterstyle.css'
import axios from 'axios'
import Navbar from '../../../components/home/navbar/Navbar';


function OurDocters() {
 
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/docteravaliable/listdocter`)
      .then((response) => {
        console.log('Doctors:', response);
        setDoctors(response.data.data);
      })
      .catch((err) => {
        console.error('Error fetching doctors:', err);
      });

   
  }, []);
  return (
    <>
    {/* Start Blog */}
    <Navbar/>
   
  <div id="blog" className="blog-box">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="title-box">
          <h2>DOCTORS</h2>
        
        </div>
      </div>
    </div>
    <div className="row">
    {doctors.map((data,key)=>(
      <div className="col-lg-3 col-md-6 col-sm-12">
        <div className="blog-inner">
          <div className="blog-img">
            <img className="img-fluid" src={`/photos/${data.photo}`} alt="" style={{height:'400px',width:'200px'}} />
          </div>
          
          <h2>{data.D_first_name} {data.D_last_name}</h2>
          <p>
         {data.D_qualification}
          </p>
          <p>{data.D_phone}</p>
          <p>{data.D_email}</p>
          {/* <div className="blog-img">
            <img className="img-fluid" src='' alt="" style={{height:'400px',width:'200px'}} />
          </div>
          
          <h2>name</h2>
          <p>
        quali
          </p>
          <p>phone</p>
          <p>email</p> */}
         
        </div>
      </div>
     ))}
    </div>
  </div>
</div>


<hr/>
   
{/* End Blog */}
</>
  )
}

export default OurDocters
