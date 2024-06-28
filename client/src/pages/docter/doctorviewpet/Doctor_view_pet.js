import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function Doctor_view_pet() {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
      setIsToggled(!isToggled);
    };

    const { id } = useParams()
   
    console.log("hai",id);
    const navigate = useNavigate()

    const [user, setUser] = useState([])

    useEffect(() => {
       

        axios.get(`http://localhost:4000/pet/viewpet/${id}`).then((response) => {
            console.log(response);
            setUser(response.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const Viewpriscription = (id) => {
        navigate(`/tableview_prescription/${id}`)
    }
    const Viewvaccine = (id) => {
        navigate(`/tableview_vaccine/${id}`)
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
   
     <>
           
           <div className="page-wrapper" style={{ height: '800px' }}>
               <div className="content">

                   <div className="col-sm-4 col-3">

                       <h4 className="page-title">Pets</h4>
                   </div>

                   <div className="col-sm-8 col-9 text-right m-b-20">
                       <a
                           href="/addpet"
                           className="btn btn-primary btn-rounded float-right" style={{ position: 'absolute', right: '-500px' }}
                       >
                           <i className="fa fa-plus" /> Add Pet
                       </a>
                   </div>


               </div>
               <div className="row doctor-grid">
                   {user.map((data, key) => (



                       <div className="col-md-4 col-sm-4  col-lg-3">

                           <div className="profile-widget">

                               <div className="doctor-img">
                                   <a className="avatar" href="">
                                       <img alt="" src={`/photos/${data.photo}`} />
                                   </a>
                               </div>
                          

                               <h4 className="doctor-name text-ellipsis">
                                   <a href="profile.html"></a>
                               </h4>
                               <div className="doc-prof">pet name:{data.pet_name}</div>
                               <div className="doc-prof">Category:{data.Category}</div>
                               <div className="doc-prof">breed:{data.breed}</div>
                               <div className="doc-prof">weight:{data.weight}</div>
                               <div className="doc-prof">height:{data.height}</div>

                               <div className="doc-prof">gender:{data.gender}</div>



                               <button className='mx-3 btn btn-primary' onClick={() => Viewpriscription(data._id)}>priscription</button>

                               <button  className='mx-3 btn btn-primary' onClick={() => Viewvaccine(data._id)}>vaccine</button>
                           </div>
                       </div>






                   ))}
               </div>
</div>
</>
   </div>
 </div>

 </div>
 </>
  )
}

export default Doctor_view_pet
