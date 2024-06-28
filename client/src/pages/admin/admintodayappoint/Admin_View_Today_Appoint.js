import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';



function Admin_View_Today_Appoint() {
    const [isToggled, setIsToggled] = useState(false);
    const navigate=useNavigate()

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all items from localStorage
    navigate('/'); // Redirect to the home page
  };

  const [appoint, setAppoint] = useState([
    // id=doctorid
])
useEffect(() => {
    axios.get('http://localhost:4000/appoint/appoint').then((response) => {
        const currentDate = new Date().toISOString().split('T')[0];
        const filteredAppointments = response.data.data.filter(appointment => {
          const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
          return appointmentDate === currentDate;
        });
        setAppoint(filteredAppointments);
      }).catch((err) => {
        console.log(err);
    })
}, [])
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
          <li><a className='nav-link ' onClick={handleLogout}>logout</a></li>
         
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
        <div class="container-flux">
                <div class="row align-items-center">

                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">


                          
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
                                            <th scope="col">owner</th>
                                            <th scope="col">Species</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phoneno</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">status</th>
                                            <th scope="col" style={{ width: '200px' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appoint.map((data, key) => (
                                            <tr>
                                                {/* <th scope="row" class="ps-4">
                                    <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck1" /><label class="form-check-label" for="contacusercheck1"></label></div>
                                </th> */}
                                                <th>{key + 1}</th>
                                                <td><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="avatar-sm rounded-circle me-2" /><a href="#" class="text-body">{data.user_id.u_name}</a></td>
                                                <td><span class="badge badge-soft-success mb-0">{data.breed}</span></td>
                                                <td>{data.user_id.u_email}</td>
                                                <td>{data.user_id.u_phone}</td>
                                                <td>{data.date}</td>
                                                <td>{data.status}</td>
                                                


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
    </div>

    </div>
  )
}

export default Admin_View_Today_Appoint
