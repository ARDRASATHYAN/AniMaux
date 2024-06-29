import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Viewservices() {
    const [isToggled, setIsToggled] = useState(false);
    const [user, setUser] = useState([])
    const navigate=useNavigate()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/service/viewservices`).then((response) => {
            console.log(response);
            setUser(response.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };
    return (
        <div>
            <div id="wrapper" className={`wrapper-content ${isToggled ? 'toggled' : ''}`}>
                <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
          <li className="sidebar-brand"><a href="#"><img src='/images/logo.png' style={{height:'30px'}}/>animaux</a></li>
          <li><a href="/dash">Dashboard</a></li><hr style={{color:'#fff'}}/>
          <li> <Link className='nav-link ' as={Link} to="/schedule" >sheduledocter</Link></li><hr style={{color:'#fff'}}/>
          <li> <Link className='nav-link ' as={Link} to="/admindoctorreg">doctorReg</Link></li><hr style={{color:'#fff'}}/>
          <li><Link className='nav-link ' as={Link} to="/addservices">addservices</Link></li><hr style={{color:'#fff'}}/>
          <li><Link className='nav-link ' as={Link} to="/adminreguser">reguser</Link></li><hr style={{color:'#fff'}}/>

          <li><Link className='nav-link ' as={Link} to="/viewusers">viewuser</Link></li><hr style={{color:'#fff'}}/>
          <li><Link className='nav-link ' as={Link} to="/viewdoctors">viewdocter</Link></li><hr style={{color:'#fff'}}/>
          <li><Link className='nav-link ' as={Link} to="/adminviewshedules">viewschedules</Link></li><hr style={{color:'#fff'}}/>
          <li><Link className='nav-link ' as={Link} to="/viewappointment">viewappointment</Link></li><hr style={{color:'#fff'}}/>
          <li><Link className='nav-link ' as={Link} to="/viewservice">view services</Link></li><hr style={{color:'#fff'}}/>
          <li><Link className='nav-link ' as={Link} to="/">logout</Link></li>
         
        </ul>
                </div>

                <div id="page-content-wrapper">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button className="btn-menu btn btn-success btn-toggle-menu" type="button" onClick={handleToggle}>
                                    <i className="fa fa-bars"></i>
                                </button>
                            </div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="ti-panel"></i>
                                            <p>Stats</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="ti-settings"></i>
                                            <p>Settings</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <div className="row">
                            <div id="services" className="services-box" >
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
                                            {user.map((data, key) => (

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




                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Viewservices
