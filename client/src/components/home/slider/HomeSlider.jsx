import React, { useEffect, useState } from 'react'

import './silder.css'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function HomeSlider() {
  const [slots, setSlots] = useState([]);
  const navigate=useNavigate()
  const login_id = localStorage.getItem('login_id')
  useEffect(() => {
    axios.get('http://localhost:4000/service/view-slot')
      .then((response) => {
        console.log('Slots:', response.data.data);
        setSlots(response.data.data);
      })
      .catch((err) => {
        console.error('Error fetching slots:', err);
      });
  }, []);



  const takeAppoint=()=>{
    if(login_id){
      navigate('/appoint')
    }
  else{
    navigate('/login')
  }

  }
  return (
    <>
      <div className="home-slider-container">
        <div className="home-slider">
          <div className="caption">
            <div className="lbox-details">
              <h1>"Compassionate Care for Your Beloved Companions"</h1>
              <button class="btn btn-success" onClick={takeAppoint} style={{padding:'20px'}}>Take Appointment</button>
            </div>
          </div>
          <div className="right-card">
            <h3>Today</h3>
            <div className="card-content">

              {slots.map((slot, key) => (
                <>
                  <img src={`/photos/${slot.photo}`} alt="" className="card-image" />
                  <h2 >{slot.D_first_name}</h2>
                  {/* <p>{slot.date}</p> */}
                  <h2> {slot.start_time}-{slot.end_time}</h2>

                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default HomeSlider
