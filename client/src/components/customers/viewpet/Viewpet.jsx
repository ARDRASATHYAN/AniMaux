import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './pet.css'
import Navbar from '../../home/navbar/Navbar'


function Viewpet() {
    const { id } = useParams()
    const user_id = localStorage.getItem('user_id')
    console.log("hai", user_id);
    const navigate = useNavigate()

    const [user, setUser] = useState([])

    useEffect(() => {
        console.log(user_id);

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/pet/viewpet/${user_id}`).then((response) => {
            console.log(response);
            setUser(response.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const Viewpriscription = (id) => {
        navigate(`/tableview_prescription/${id}`)
    }
    const Viewvaccine = (id) => {
        navigate(`/tableview_vaccine/${id}`)
    }

    return (
        <>
            <Navbar />
            <div className="page-wrapper" style={{ height: '800px', background: '#f2f3f5' }}>
                <div className="content">

                    <div className="col-sm-4 col-3">

                        <h4 className="page-title">Pets</h4>
                    </div>

                    <div className="col-sm-8 col-9 text-right m-b-20">
                        <a
                            href="/addpet"
                            className="btn btn-primary btn-rounded float-right" style={{ position: 'absolute', right: '-500px' }}
                        >
                            <i className="fa fa-plus" /> Add Pet
                        </a>
                    </div>


                </div>
                <div className="row doctor-grid">
                    {user.map((data, key) => (



                        <div className="col-md-4 col-sm-4  col-lg-3">

                            <div className="profile-widget">

                                <div className="doctor-img">
                                    <a className="avatar" href="">
                                        <img alt="" src={`/photos/${data.photo}`} />
                                    </a>
                                </div>
                               

                                <h4 className="doctor-name text-ellipsis">
                                    <a href="profile.html"></a>
                                </h4>
                                <div className="doc-prof">pet name:{data.pet_name}</div>
                                <div className="doc-prof">Category:{data.Category}</div>
                                <div className="doc-prof">breed:{data.breed}</div>
                                <div className="doc-prof">weight:{data.weight}</div>
                                <div className="doc-prof">height:{data.height}</div>

                                <div className="doc-prof">gender:{data.gender}</div>



                                <button className='mx-3 btn btn-primary' onClick={() => Viewpriscription(data._id)}>priscription</button>

                                <button  className='btn btn-primary'onClick={() => Viewvaccine(data._id)}>vaccine</button>
                            </div>
                        </div>






                    ))}
                </div>

            </div>

        </>
    )
}

export default Viewpet
