import React, { useEffect, useState } from 'react'
import './style/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Navbar from '../../../components/home/navbar/Navbar'
import { useParams } from 'react-router-dom'


function Viewvaccinecetificate() {
    const [first, setfirst] = useState(null); // Initialize state to null
    const { id } = useParams()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/vaccine/viewvaccines/${id}`)
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
        return <div>no vaccination certificate found</div>;
    }

    return (
        <>
            <Navbar />
            <div className="vaccine-container">
                <div className="row">

                    <div className="receipt-main col-md-8 offset-md-2" >

                        <div style={{ backgroundColor: 'yellow' }}> <h1>Animuax Petcare Center</h1>
                            <h3>Vadakara</h3></div>
                        {/* Owner Details */}
                        <div>
                            <h6>Owner Details</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ color: 'black' }}>Owner Name</th>
                                        <th style={{ color: 'black' }}>Address</th>
                                        <th style={{ color: 'black' }}>Phone</th>
                                        <th style={{ color: 'black' }}>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{first[0]?.appoint_id?.user_id?.u_name}</td>
                                        <td>{first[0]?.appoint_id?.user_id?.address}</td>
                                        <td>{first[0]?.appoint_id?.user_id?.u_phone}</td>
                                        <td>{first[0]?.appoint_id?.user_id?.u_email}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Pet Details */}
                        <div>
                            <h6>Pet Details</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ color: 'black' }}>Breed</th>
                                        <th style={{ color: 'black' }}>Category</th>
                                        <th style={{ color: 'black' }}>Age</th>
                                        <th style={{ color: 'black' }}>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{first[0]?.appoint_id?.breed}</td>
                                        <td>{first[0]?.appoint_id?.Category}</td>
                                        <td>{first[0]?.appoint_id?.age}</td>
                                        <td>{first[0]?.appoint_id?.gender}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Vaccination Details */}
                        <div>
                            <h6>Vaccination Details</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ color: 'black' }}>Date of Vaccination</th>
                                        <th style={{ color: 'black' }}>Type of Vaccination</th>
                                        <th style={{ color: 'black' }}>Brand</th>
                                        <th style={{ color: 'black' }}>Batch No</th>
                                        <th style={{ color: 'black' }}>Next Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{first[0]?.date}</td>
                                        <td>{first[0]?.type}</td>
                                        <td>{first[0]?.brand}</td>
                                        <td>{first[0]?.batchno}</td>
                                        <td>{first[0]?.nextdate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Doctor Details */}
                        <div>
                            <h6>Doctor Details</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ color: 'black' }}>Doctor Name</th>
                                        <th style={{ color: 'black' }}>Qualification</th>
                                        <th style={{ color: 'black' }}>Phone</th>
                                        <th style={{ color: 'black' }}>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Dr.{first[0]?.doctor_id?.D_first_name} {first[0]?.doctor_id?.D_last_name}</td>
                                        <td>{first[0]?.doctor_id?.D_qualification}</td>
                                        <td>{first[0]?.doctor_id?.D_phone}</td>
                                        <td>{first[0]?.doctor_id?.D_email}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Viewvaccinecetificate
