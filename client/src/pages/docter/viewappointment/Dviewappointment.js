import React, { useEffect, useState } from 'react'
// import $ from 'jquery';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/home/navbar/Navbar';


function Dviewappointment() {

    const doctorid = localStorage.getItem('doctor_id')
    console.log('hlo====>', doctorid);
    const navigate = useNavigate()
    const [appoint, setAppoint] = useState([
        // id=doctorid
    ])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/appoint/appoint`).then((response) => {
            const currentDate = new Date().toISOString().split('T')[0];
            const filteredAppointments = response.data.data.filter(appointment => {
              const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
              return appointmentDate === currentDate;
            });
            setAppoint(filteredAppointments);
          }).catch((err) => {
            console.log(err);
        })
    }, [])
    const handlePriscription = (id, pet_id) => {
        navigate(`/addpriscription/${id}/${pet_id}`)
    }
    const handlevaccination = (id, pet_id) => {
        navigate(`/Addvaccinationcetificate/${id}/${pet_id}`)
    }
    return (
        <>
           
            <div class="container-flux">
                <div class="row align-items-center">

                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">


                            {/* <div class="dropdown">
                    <a class="btn btn-link text-muted py-1 font-size-16 shadow-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div> */}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 centered-table-wrapper" >
                        <div class="">
                            <div class="table-responsive">
                                <table class="table project-list-table table-nowrap align-middle table-borderless">
                                    <thead>
                                        <tr>
                                            {/* <th scope="col" class="ps-4" style={{width:'50px'}}>
                                    <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck" /><label class="form-check-label" for="contacusercheck"></label></div>
                                </th> */}
                                            <th></th>
                                            <th scope="col">Owner</th>
                                            <th scope="col">Petname</th>
                                            <th scope="col">Species</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phoneno</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">status</th>
                                            <th scope="col" style={{ width: '200px' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appoint.map((data, key) => (
                                            <tr>
                                                {/* <th scope="row" class="ps-4">
                                    <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck1" /><label class="form-check-label" for="contacusercheck1"></label></div>
                                </th> */}
                                                <th>{key + 1}</th>
                                                <td><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="avatar-sm rounded-circle me-2" /><a href="#" class="text-body">{data.user_id.u_name}</a></td>
                                                <td>{data.pet_name}</td>
                                                <td><span class="badge badge-soft-success mb-0">{data.breed}</span></td>
                                                <td>{data.user_id.u_email}</td>
                                                <td>{data.user_id.u_phone}</td>
                                                <td>{data.date}</td>
                                                <td>{data.status}</td>
                                                <td><span class="badge badge-soft-success mb-0"><button class="badge badge-soft-success mb-0" onClick={() => handlePriscription(data._id, data.pet_id)}>priscription</button></span>
                                                    <span class="badge badge-soft-success mb-0"><button class="badge badge-soft-success mb-0" onClick={() => handlevaccination(data._id, data.pet_id)}>vaccination</button></span></td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dviewappointment
