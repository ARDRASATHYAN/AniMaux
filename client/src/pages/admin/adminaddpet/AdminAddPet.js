import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';


function AdminAddPet() {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
      setIsToggled(!isToggled);
    };

   
    
    const navigate = useNavigate()
    const {id}=useParams()
    const [input, setInput] = useState({
      user_id: id,
      breed: '',
      Category: '',
      age: '',
      pet_name: '',
      gender: '',
      weight: '',
      height: '',
      // dob: '',
      photo: ''
    })
    const [file, setFile] = useState()
    const [formErrors, setformErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
  
    const inputchange = (e) => {
      const name = e.target.name
      const value = e.target.value
      setInput({ ...input, [name]: value })
    }
  
  
  
    const submit = (e) => {
      e.preventDefault();
    }
    const validate = (values) => {
      const errors = {};
      const regex1 = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)
      //   const regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      // var phoneno = /^[6-9]\d{9}$/;
      // let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
      if (!values.breed) {
        errors.breed = "breed name is required"
      }
      if (!values.Category) {
        errors.Category = "must need to select the category"
      }
      if (!values.age) {
        errors.age = "age is required"
      }
      if (!values.pet_name) {
        errors.pet_name = "pet_name is required"
      }
      if (!values.gender) {
        errors.gender = "gender must be specifed"
      }
      if (!values.height) {
        errors.height = "height must be required"
      }
      if (!values.weight) {
        errors.weight = "weight must be required"
      }
      // if (!values.dob) {
      //   errors.dobe = "dob must be specifed"
      // }
  
      if (!values.photo) {
        errors.photo = "photo Number is required!";
      } else if (!regex1.test(values.photo)) {
        errors.photo = "photo must be in the format jpeg,jpg ,png !";
      }
  
  
      return errors;
    };
    const validation = (e) => {
      e.preventDefault();
      setformErrors(validate(input))
      setIsSubmit(true)
      console.log(formErrors);
      if (Object.keys(formErrors).length == 0 && isSubmit) {
        console.log(input);
        if (file) {
          const data = new FormData()
          data.append('name', file.name)
          data.append('file', file)
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/image/upload-image`, data).then((response) => {
            console.log(response);
          })
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/pet/pet`, input).then((response) => {
          console.log("res===========>", response.data);
          if (response.data.success === true) {
           window.location.reload();
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    }
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
      {/* Section: Design Block */}
      <section className="text-center text-lg-start">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .cascading-right {\n      margin-right: -50px;\n    }\n\n    @media (max-width: 991.98px) {\n      .cascading-right {\n        margin-right: 0;\n      }\n    }\n  "
          }}
        />
        {/* Jumbotron */}
        <div className="contact_form">
          <div
            className="card cascading-right bg-body-tertiary"
            style={{ backdropFilter: "blur(30px)" }}
          >
            <div className="card-body p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <form>

                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="pet_name"
                        id="last_name"
                        className="form-control"
                        placeholder="PET NAME" onChange={inputchange}
                      />
                      <label htmlFor="dob">pet name</label>
                      <span style={{ color: 'red' }}> {formErrors?.pet_name}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">
                      <input type="text"
                        name="Category"
                        id="first_name"
                        className="form-control"
                        placeholder="Category" onChange={inputchange}
                      />
                      <label htmlFor="first_name">species</label>
                      <span style={{ color: 'red' }}> {formErrors?.Category}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      type="text"
                      name="u_phone"
                      id="phone"
                      className="form-control"
                      placeholder="Your Phone" onChange={inputchange}
                    />
                    <span style={{ color: 'red' }}> {formErrors?.u_phone}</span>
                  </div>
                </div>

                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">
                      <input
                        type="email"
                        name="breed"
                        id="email"
                        className="form-control"
                        placeholder="Breed" onChange={inputchange}
                      />
                      <label htmlFor="dob">breed</label>
                      <span style={{ color: 'red' }}> {formErrors?.breed}</span>
                    </div>
                  </div>
                </div>

                <div class="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      type="number"
                      name="age"
                      id="email"
                      className="form-control"
                      placeholder="age" onChange={inputchange}
                    />
                    <label htmlFor="dob">age</label>
                    <span style={{ color: 'red' }}> {formErrors?.age}</span>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      type="number"
                      name="weight"
                      id="phone"
                      className="form-control"
                      placeholder="weight" onChange={inputchange}
                    />
                    <label htmlFor="dob">weight</label>
                    <span style={{ color: 'red' }}> {formErrors?.weight}</span>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      type="number"
                      name="height"
                      id="phone"
                      className="form-control"
                      placeholder="height" onChange={inputchange}
                    />
                    <label htmlFor="dob">height</label>
                    <span style={{ color: 'red' }}> {formErrors?.height}</span>
                  </div>
                </div>

                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <select className="select" name="gender" class="form-control" placeholder="gender" onChange={inputchange}>
                      <option>Select</option>
                      <option>female</option>
                      <option>male</option>
                    </select>
                    <label htmlFor="dob">gender</label>
                    <span style={{ color: 'red' }}> {formErrors?.gender}</span>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div class="form-floating" >
                    <input
                      type="file"
                      name="photo"
                      id="phone"
                      className="form-control"
                      placeholder="photo" onChange={(e) => { setFile(e.target.files[0]); setInput({ ...input, photo: e.target.files[0].name }) }}
                    />
                    <label htmlFor="dob">photo</label>
                    <span style={{ color: 'red' }}> {formErrors?.photo}</span>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <button
                    type="submit"
                    value="SEND"
                    id="submit"
                    className="new-btn-d br-2 btn btn-light btn-radius btn-brd grd1 btn-block" onClick={validation} style={{ background: '#12557f', marginLeft: 0 }}
                  >
                    ADD
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Jumbotron */}
      </section>
      {/* Section: Design Block */}
    </>
        </div>
      </div>
  
      </div>
  )
}

export default AdminAddPet
