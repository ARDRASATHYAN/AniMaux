import React, { useEffect, useState } from 'react'


import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../components/home/navbar/Navbar';


function TableViewPrescription() {


    const { id } = useParams()
    const [first, setfirst] = useState(null); // Initialize state to null
    const navigate = useNavigate()
    console.log('id', id);
    useEffect(() => {
        axios.get(`http://localhost:4000/prescription/prescriptions/${id}`)
            .then((Response) => {
                console.log('API response:', Response.data); // Log the response
                setfirst(Response.data.data);
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    }, []);

    // Check if data is loaded before rendering
    if (!first) {
        return <div>no data found</div>;
    }


    const handlePriscription = (id) => {
        navigate(`/viewprescription/${id}`)
    }

    return (
        <div>
            <Navbar />
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
                                            <th scope="col">appoint_id</th>
                                            <th scope="col"> date</th>
                                            <th scope="col">breed</th>
                                            <th scope="col">age</th>
                                            <th scope="col">doctorname</th>
                                            <th scope="col">petname</th>
                                            <th scope="col" style={{ width: '200px' }}>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {first.map((data, key) => (
                                            <tr>
                                                {/* <th scope="row" class="ps-4">
                                    <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck1" /><label class="form-check-label" for="contacusercheck1"></label></div>
                                </th> */}
                                                <th>{key + 1}</th>
                                                <td><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="avatar-sm rounded-circle me-2" /><a href="#" class="text-body">{data?.appoint_id?._id}</a></td>
                                                <td><span class="badge badge-soft-success mb-0">{data?.appoint_id?.date}</span></td>
                                                <td> {data?.appoint_id?.breed}</td>
                                                <td>{data?.appoint_id?.age}</td>
                                                <td> Dr.{data?.doctor_id?.D_first_name} {data?.doctor_id?.D_last_name}</td>
                                                <td>{data?.doctor_id?.D_email}</td>
                                                <td><span class="badge badge-soft-success mb-0"><button class="badge badge-soft-success mb-0" onClick={() => handlePriscription(data?.appoint_id?._id)}>priscription</button></span>
                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TableViewPrescription
