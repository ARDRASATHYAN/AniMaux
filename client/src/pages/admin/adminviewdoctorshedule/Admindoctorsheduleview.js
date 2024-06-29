import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './style.css'

function Admindoctorsheduleview() {
    const [isToggled, setIsToggled] = useState(false);
    const navigate=useNavigate()
    const [slots, setSlots] = useState([]);
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/service/view-slot`)
        .then((response) => {
          console.log('Slots:', response.data.data);
          setSlots(response.data.data);
        })
        .catch((err) => {
          console.error('Error fetching slots:', err);
        });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/docteravaliable/delete-slot/${id}`)
          .then(() => {
            setSlots(slots.filter((slot) => slot._id !== id));
          })
          .catch((err) => {
            console.error('Error deleting slot:', err);
          });
      };

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
   
<div class="container">
<div class="row bootstrap snippets bootdeys" style={{padding:'20px'}}>
    
    
    
{slots.map((slot, key) => (
    
    <div class="col-md-3" style={{backgroundColor:'#451b4673'}}>
        <div class="panel text-center">
        <div class="panel-body">
          <img alt="Avatar" class="img-md img-circle img-border mar-btm" src={`/photos/${slot.photo}`}/>
          <h4 class="mar-no">{slot.D_first_name}</h4>
          <p>{slot.date}</p>
        </div>
        <div class="pad-all">
          <p class="text-muted">
          {slot.start_time}-{slot.end_time}
          </p>
          <div class="pad-btm">
           
            <button class="btn btn-success" onClick={()=>handleDelete(slot._id)}>delete</button>
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
  )
}

export default Admindoctorsheduleview
