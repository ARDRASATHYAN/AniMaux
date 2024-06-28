import React, { useEffect, useState } from 'react'
import './dash.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const [user, setUser] = useState([])
    const navigate=useNavigate()
  
    useEffect(() => {
      axios.get('http://localhost:4000/user/viewuser').then((response) => {
        console.log(response);
        setUser(response.data.data)
      }).catch((err) => {
        console.log(err);
      })
    }, [])
    const [appoints, setAppoints] = useState([
        // id=doctorid
    ])
    useEffect(() => {
        axios.get('http://localhost:4000/appoint/appoint').then((response) => {
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
    const [appoint, setAppoint] = useState([
        // id=doctorid
      ])
      useEffect(() => {
        axios.get('http://localhost:4000/appoint/appoint').then((response) => {
          console.log(response);
          setAppoint(response.data.data)
        }).catch((err) => {
          console.log(err);
        })
      }, [])
      const [doctors, setDoctors] = useState([]);

      useEffect(() => {
        // Fetch doctors
        axios.get('http://localhost:4000/docteravaliable/listdocter')
          .then((response) => {
            console.log('Doctors:', response);
            setDoctors(response.data.data);
          })
          .catch((err) => {
            console.error('Error fetching doctors:', err);
          });
    
       
      }, []);

     

      const TotalAppoint=()=>{
        navigate('/viewappointment')
      }
      const TotayAppoint=()=>{
        navigate('/adminviewtodayappointment')
      }

      const TotalDoctor=()=>{
        navigate('/viewdoctors')
      }

      const TotalUser=()=>{
        navigate('/viewusers')
      }
  return (
    <div>
      <div class="container">
    <div class="row">
        <div class="col-lg-3 col-sm-6">
            <div class="card-box bg-blue">
                <div class="inner">
                    <h3> {appoints.length} </h3>
                    <p> Today Appointments</p>
                </div>
                <div class="icon">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                </div>
                <a onClick={TotayAppoint} class="card-box-footer">
                    View More <i class="fa fa-arrow-circle-right"></i>
                </a>
            </div>
        </div>

        <div class="col-lg-3 col-sm-6">
            <div class="card-box bg-green">
                <div class="inner">
                    <h3>{doctors.length} </h3>
                    <p>Doctors</p>
                </div>
                <div class="icon">
                <i class="fa fa-user-md" aria-hidden="true"></i>
                </div>
                <a onClick={TotalDoctor} class="card-box-footer">
                    View More <i class="fa fa-arrow-circle-right"></i>
                </a>
            </div>
        </div>
        <div class="col-lg-3 col-sm-6">
            <div class="card-box bg-orange">
                <div class="inner">
                    <h3>{appoint.length} </h3>
                    <p> Total Appointments</p>
                </div>
                <div class="icon">
                    <i class="fa fa-user-plus" aria-hidden="true"></i>
                </div>
                <a onClick={TotalAppoint} class="card-box-footer">
                    View More <i class="fa fa-arrow-circle-right"></i>
                </a>
            </div>
        </div>
        <div class="col-lg-3 col-sm-6">
            <div class="card-box bg-red">
                <div class="inner">
                    <h3>{user.length} </h3>
                    <p> Users </p>
                </div>
                <div class="icon">
                    <i class="fa fa-users"></i>
                </div>
                <a onClick={TotalUser} class="card-box-footer">
                    View More <i class="fa fa-arrow-circle-right"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 col-sm-6">
            {/* <a href="#">uiuxstream</a> */}
        </div>
    </div>
</div>
    </div>
  )
}

export default Dashboard
