import React, { useState } from 'react'
import Addpriscription from '../../../components/doctors/priscription/Addpriscription'
import { Link, useNavigate } from 'react-router-dom';

function AddPriscriptions() {
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
        <li><a href="/doctorhome">Dashboard</a></li><hr style={{color:'#fff'}}/>
        <li> <Link className='nav-link ' as={Link}  to="/Dviewappointment">Appointment</Link></li><hr style={{color:'#fff'}}/>
        <li> <Link className='nav-link ' as={Link} to="/doctoruserview">user</Link></li><hr style={{color:'#fff'}}/>
        <li> <a className='nav-link 'onClick={handleLogout}>Logout</a></li><hr style={{color:'#fff'}}/>
         
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
        <Addpriscription />

      </div>
    </div>

    </div>

    


   
  )
}

export default AddPriscriptions
