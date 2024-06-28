import React, { useEffect, useState } from 'react'
// import $ from 'jquery';
import './css/style.css';
import { Link, useNavigate } from 'react-router-dom';
import Addservice from '../../../components/admin/addservices/Addservice';



function Addservies() {
  const [isToggled, setIsToggled] = useState(false);
  const navigate=useNavigate()
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const handleLogout = () => {
    localStorage.clear(); // Clear all items from localStorage
    navigate('/'); // Redirect to the home page
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
          <li><a className='nav-link '  to="/" onClick={handleLogout}>logout</a></li>
         
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
              <div className="col-lg-12">

                <Addservice />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default Addservies
