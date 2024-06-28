import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function TotalAppointview() {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
      setIsToggled(!isToggled);
    };
    const doctorid = localStorage.getItem('doctor_id')
    console.log('hlo====>',doctorid);
    const navigate = useNavigate()
    const [appoint, setAppoint] = useState([
      // id=doctorid
    ])
    useEffect(() => {
      axios.get('http://localhost:4000/appoint/appoint').then((response) => {
        console.log(response);
        setAppoint(response.data.data)
      }).catch((err) => {
        console.log(err);
      })
    }, [])
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
        <div class="container-flux">
    <div class="row align-items-center">
        <div class="col-md-6">
            <div class="mb-3">
               
            </div>
        </div>
       
       
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="">
                <div class="table-responsive">
                    <table class="table project-list-table table-nowrap align-middle table-borderless">
                        <thead>
                            <tr>
                               
                               
                                <th></th>
                                <th scope="col">owner</th>
                                <th scope="col">Petname</th>
                                <th scope="col">Species</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phoneno</th>
                                <th scope="col">Date</th>
                                <th scope="col" style={{width:'200px'}}>status</th>
                            </tr>
                        </thead>
                        <tbody>
                          {appoint.map((data,key)=>(
                            <tr>
                               
                               
                                <th>{key+1}</th>
                                <td><img src={`photos/${data.pet_id.photo}`} alt="" class="avatar-sm rounded-circle me-2" /><a href="#" class="text-body">{data.user_id.u_name}</a></td>
                                <td>{data.pet_name}</td>
                                <td><span class="badge badge-soft-success mb-0">{data.breed}</span></td>
                                <td>{data.user_id.u_email}</td>
                                <td>{data.user_id.u_phone}</td>
                                <td>{data.date}</td>
                                <td><span class="badge badge-soft-success mb-0">{data.status}</span></td>
                                
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

export default TotalAppointview
