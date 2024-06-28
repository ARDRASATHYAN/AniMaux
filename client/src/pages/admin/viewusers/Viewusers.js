import React, { useEffect, useState } from 'react'
import './css/style.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Viewusers() {
  const [isToggled, setIsToggled] = useState(false);
  const [user, setUser] = useState([])
  const navigate=useNavigate()
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    axios.get('http://localhost:4000/user/viewuser').then((response) => {
      console.log(response);
      setUser(response.data.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const viewpet=(id)=>{
navigate(`/adminviewpet/${id}`)
  }
  const takeappoint=(id)=>{
    navigate(`/appoints/${id}`)
      }
      const addpet=(id)=>{
        navigate(`/adminaddpet/${id}`)
          }
          const handleLogout = () => {
            localStorage.clear(); // Clear all items from localStorage
            navigate('/'); // Redirect to the home page
          };
  return (
    <>
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
          <li><a className='nav-link ' onClick={handleLogout} to="/">logout</a></li>
         
        </ul>
        </div>

        <div id="page-content-wrapper" >
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
                            <button class="btn btn-primary btn-round mx-3" onClick={()=>{takeappoint(data._id)}}>appointment</button>
                            <button class="btn btn-primary btn-round" onClick={()=>{addpet(data._id)}}>addpet</button>
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


    </>

  )
}

export default Viewusers
