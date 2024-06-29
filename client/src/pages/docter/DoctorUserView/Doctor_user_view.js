import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



function Doctor_user_view() {
    const [isToggled, setIsToggled] = useState(false);
    const [user, setUser] = useState([])
    const navigate=useNavigate()
    const handleToggle = () => {
      setIsToggled(!isToggled);
    };
  
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/viewuser`).then((response) => {
        console.log(response);
        setUser(response.data.data)
      }).catch((err) => {
        console.log(err);
      })
    }, [])
  
    const viewpet=(id)=>{
  navigate(`/doctorpetview/${id}`)
    }
   
       
            const handleLogout = () => {
              localStorage.clear(); // Clear all items from localStorage
              navigate('/'); // Redirect to the home page
            };
return (
  <>
  <div>
  <div id="wrapper" className={`wrapper-content ${isToggled ? 'toggled' : ''}`}>
    <div id="sidebar-wrapper">
      <ul className="sidebar-nav">
        <li className="sidebar-brand"><a href="/doctorhome"><img src='/images/logo.png' style={{height:'30px'}}/>animaux</a></li>
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
      <div class="container profile-page">
            <div class="row row-style">
            {user.map((data, key) => (
              <div class="col-xl-6 col-lg-7 col-md-12">
                <div class="card profile-header">
                  <div class="body">

                   
                      <div class="row">
                        <div class="col-lg-4 col-md-4 col-12">
                          <div class="profile-image float-md-right"> <img src={`photos/${data.photo}`} alt="" /> </div>
                        </div>
                        <div class="col-lg-8 col-md-8 col-12">
                          <h4 class="m-t-0 m-b-0"><strong>{data.u_name}</strong></h4>
                          <span class="job_post">{data.u_email}</span><br />
                          <span class="job_post">{data.u_phone}</span>
                          <p>{data.address}</p>
                          <div>
                            <button class="btn btn-primary btn-round mx-3" onClick={()=>{viewpet(data._id)}}>viewpet</button>
                         
                           
                          </div>
                          
                          
                        </div>
                      </div>

                   
                  </div>
                </div>
              </div>
            ))}

            </div>
          </div>

    </div>
  </div>

  </div>
  </>
  )
}

export default Doctor_user_view
