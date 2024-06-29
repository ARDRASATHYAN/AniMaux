import React, { useEffect, useState } from 'react'
import './dash.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Doctordashboard() {
    const [appoint, setAppoint] = useState([
        // id=doctorid
      ])
      const navigate=useNavigate()
      useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/appoint/appoint`).then((response) => {
          console.log(response);
          setAppoint(response.data.data)
        }).catch((err) => {
          console.log(err);
        })
      }, [])

      const [appoints, setAppoints] = useState([
        // id=doctorid
    ])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/appoint/appoint`).then((response) => {
            const currentDate = new Date().toISOString().split('T')[0];
            const filteredAppointments = response.data.data.filter(appointment => {
              const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
              return appointmentDate === currentDate;
            });
            setAppoints(filteredAppointments);
          }).catch((err) => {
            console.log(err);
        })
    }, [])

    const [user, setUser] = useState([])
    
  
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/viewuser`).then((response) => {
        console.log(response);
        setUser(response.data.data)
      }).catch((err) => {
        console.log(err);
      })
    }, [])

   
const TotalAppoint=()=>{
  navigate('/totalappoint')
}
const TotayAppoint=()=>{
  navigate('/Dviewappointment')
}
const Totaluser=()=>{
  navigate('/doctoruserview')
}
  return (
    <div class="container" style={{padding:'20px'}}>
    <div class="row">
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-blue order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Total Appointment</h6>
                    <h2 class="text-right"><i class="fa fa-calendar f-left" aria-hidden="true"></i><span>{appoint.length}</span></h2>
                    <p class="m-b-0"><span class="f-right"></span></p>
                    <a onClick={TotayAppoint} class="card-box-footer">
                    View More <i class="fa fa-arrow-circle-right"></i>
                </a>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-green order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Today appointment</h6>
                    <h2 class="text-right"><i class="fa fa-calendar f-left" aria-hidden="true"></i>
                    <span>{appoints.length}</span></h2>
                    <p class="m-b-0"><span class="f-right"></span></p>
                    <a onClick={TotalAppoint} class="card-box-footer">
                    View More <i class="fa fa-arrow-circle-right"></i>
                </a>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-yellow order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Total users</h6>
                    <h2 class="text-right"><i class="fa fa-users f-left"></i><span>{user.length}</span></h2>
                    <p class="m-b-0"><span class="f-right"></span></p>
                    <a onClick={Totaluser} class="card-box-footer">
                    View More <i class="fa fa-arrow-circle-right"></i>
                </a>
                </div>
            </div>
        </div>
        
        {/* <div class="col-md-4 col-xl-3">
            <div class="card bg-c-pink order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Orders Received</h6>
                    <h2 class="text-right"><i class="fa fa-credit-card f-left"></i><span>486</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">351</span></p>
                </div>
            </div>
        </div> */}
	</div>
</div>
  )
}

export default Doctordashboard
