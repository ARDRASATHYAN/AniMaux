import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom';


function Viewdocter() {
    const [isToggled, setIsToggled] = useState(false);
    const navigate=useNavigate()
    const handleToggle = () => {
      setIsToggled(!isToggled);
    };
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
      // Fetch doctors
      axios.get('http://localhost:4000/docteravaliable/listdocter')
        .then((response) => {
          console.log('Doctors:', response);
          setDoctors(response.data.data);
        })
        .catch((err) => {
          console.error('Error fetching doctors:', err);
        });
  
     
    }, []);

    const handleDelete = (id) => {
      axios.delete(`http://localhost:4000/docteravaliable/delete-doctor/${id}`)
        .then(() => {
          setDoctors(doctors.filter((doctor) => doctor._id !== id));
        })
        .catch((err) => {
          console.error('Error deleting slot:', err);
        });
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
          <li><a className='nav-link ' onClick={handleLogout} to="/">logout</a></li>
         
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
        <>
    {/* Start Blog */}

  <div id="blog" className="blog-box">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="title-box">
          <h2>DOCTORS</h2>
        
        </div>
      </div>
    </div>
    <div className="row">
    {doctors.map((data,key)=>(
      <div className="col-lg-3 col-md-6 col-sm-12">
        <div className="blog-inner">
          <div className="blog-img">
            <img className="img-fluid" src={`/photos/${data.photo}`} alt="" style={{height:'400px',width:'200px'}} />
          </div>
          
          <h2>{data.D_first_name} {data.D_last_name}</h2>
          <p>
         {data.D_qualification}
          </p>
          <p>{data.D_phone}</p>
          <p>{data.D_email}</p>
          <p> <button class="btn btn-primary" onClick={()=>{handleDelete(data._id)}} >Delete</button></p>
        
         
         
        </div>
      </div>
     ))}
    </div>
  </div>
</div>


   
   
{/* End Blog */}
</>
        </div>
        </div>
    </div>
  )
}

export default Viewdocter
