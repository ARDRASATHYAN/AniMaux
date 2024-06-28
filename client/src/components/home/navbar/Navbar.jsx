import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

// import  './style/nav.css';

function Navbar() {
  const role = localStorage.getItem('u_role');
  const roles = localStorage.getItem('d_role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all items from localStorage
    navigate('/'); // Redirect to the home page
  };
  return (
    <>
    <header className="top-header">
      <nav className="navbar header-nav navbar-expand-lg" style={{ boxShadow: '-moz-initial' }}>
        <div className="container">
          <img src="images/logo.png" alt="Logo" style={{height:'50px'}}/>AniMaux
         
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-wd"
            aria-controls="navbar-wd"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbar-wd">
            <ul className="navbar-nav">
              <li>
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              {role == 1 && (
                <>
                  <li>
                    <Link className="nav-link" to="/addpet">Add Pet</Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/viewpet">View Pet</Link>
                  </li>
                  {/* <li>
                    <Link className="nav-link" to="/viewprescription">View Prescription</Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/viewvaccine">View Vaccination</Link>
                  </li> */}
                  <li>
                    <Link className="nav-link" to="/appoint">Appointment</Link>
                  </li>
                  <li>
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
              {roles == 2 && (
                <>
                  <li>
                    <Link className='nav-link' to="/Dviewappointment">Appointment View</Link>
                  </li>
                  <li>
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
              {(role != 1 && roles != 2) && (
                <>
                  <li>
                    <Link className="nav-link" to="/services">Services</Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/aboutus">About Us</Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/ourdocters">Doctors</Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/userregisteration">Register</Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </>
  )
}

export default Navbar
