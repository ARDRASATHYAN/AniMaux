import React, { useEffect, useState } from 'react'
import './style/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'
import Navbar from '../../../components/home/navbar/Navbar';
import { useParams } from 'react-router-dom';





function Viewpriscription() {
    const { id } = useParams()
    const [first, setfirst] = useState(null); // Initialize state to null
    console.log('id', id);
    useEffect(() => {
        axios.get(`http://localhost:4000/prescription/prescription/${id}`)
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

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">

                    <div className="receipt-main col-md-8 offset-md-2">
                        <div style={{ backgroundColor: 'yellow' }}> <h1>Animuax petcare center</h1>
                            <h3>vadakara</h3></div>

                        {/* Left Section */}
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="receipt-left">
                                    <h5>
                                        Dr.{first[0]?.doctor_id?.D_first_name} {first[0]?.doctor_id?.D_last_name}
                                    </h5>
                                    <p>{first[0]?.doctor_id?.D_qualification}</p>
                                    <p>{first[0]?.doctor_id?.D_phone}</p>
                                    <p>{first[0]?.doctor_id?.D_email}</p>
                                </div>
                            </div>

                            <div className="col-sm-6 text-right">
                                <div className="receipt-left">
                                    <h5>
                                        Name:{first[0]?.appoint_id?.user_id}
                                    </h5>
                                    <p>Category:{first[0]?.appoint_id?.breed} </p>
                                    <p>Age:{first[0]?.appoint_id?.age} </p>
                                    <p>Date:{first[0]?.appoint_id?.date} </p>
                                </div>
                            </div>

                        </div>




                        {/* Invoice Details Table */}

                        <div>
                            <h6 >Medicine</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ color: 'black' }}>Medicine</th>
                                        <th style={{ color: 'black' }}>Times</th>
                                        <th style={{ color: 'black' }}>Days</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {first[0]?.prescriptions?.map((prescription, index) => (
                                        <tr key={index}>
                                            <td className="col-md-9">{prescription.prescription}</td>
                                            <td className="col-md-3">{prescription.times}</td>
                                            <td className="col-md-3">{prescription.days}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Viewpriscription
