import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
// import Navbar1 from './Navbar1';
import './style/loginimage.css';
import Navbar from '../../../components/home/navbar/Navbar';

function Loginpage() {
    const navigate = useNavigate()
  const [input, setInput] = useState({
    username: "",
    password: "",
    // role:""

  })
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const inputchange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput({ ...input, [name]: value })
  }




  // const submit =(e)=>{
  //   e.preventDefault();
  //   console.log(input);
  // }



  // // const handleinputchange=(e)=>{
  // //   const[name,value]=e.target
  // //   setInput({
  // //     ...input,[name]:value

  // //   })
  // //   console.log(input);

  // }
  const validate = (values) => {
    var error = {}
    if (!values.username) {
      error.username = "enter name"
    }
    if (!values.password) {
      error.password = "enter password"
    }
    return error
  }
  const validation = (e) => {
    e.preventDefault();
    setFormErrors(validate(input))
    setIsSubmit(true)
    // if(Object.keys(formerror).length===0 && issubmit){

    // }
    console.log(input);
    axios.post('http://localhost:4000/login/login',input).then((response) => {
      console.log("res==============>", response);
      if (response.data.success );
      if(response.data.success===true){
        if (response.data.role ==0) {
          localStorage.setItem('admin_id',response.data.userId )
          localStorage.setItem('login_id',response.data.login_id )
          localStorage.setItem('a_role',response.data.role)

          navigate('/adminhome')
        }
        if (response.data.role ==1) {
          localStorage.setItem('user_id',response.data.userId )
          localStorage.setItem('login_id',response.data.login_id )
          localStorage.setItem('u_role',response.data.role)

          navigate('/')
        }
        if (response.data.role ==2) {
          
         
            localStorage.setItem('doctor_id',response.data.userId )
            localStorage.setItem('login_id',response.data.login_id )
            localStorage.setItem('d_role',response.data.role)

          navigate('/doctorhome')
          
        }
        if (response.data.role ==3) {
          localStorage.setItem('pharmacy_id',response.data.userId )
          localStorage.setItem('p_login_id',response.data.login_id )
          localStorage.setItem('p_role',response.data.role)
          navigate('/pharmacyhome')
        }
        // if (response.data.role ==1) {
        //   localStorage.setItem('l_lab',response.data.userId )
        //   localStorage.setItem('l_login_id',response.data.login_id )
        //   localStorage.setItem('l_role',response.data.role)
        //   navigate('/labhome')
        // }
      }

    }).catch((err) => {
      console.log(err);
    })

  }

  return (
    <>
    <Navbar/>
    
    <div className="container-flex">
  <div className="row">
    <div className="col-md-6 col-sm-12 background-image-container">
    </div>
    <div className="col-md-6 col-sm-12 form-container">
      <div className="overlay">
        <div className="contact_form">
          <div id="message"></div>
          <form id="contactform" name="contactform" method="post">
            <fieldset className="row-fluid">
              <div className="section-title text-center">
                <div className="title-box">
                  <h2 style={{ fontFamily: 'fantasy' }}>login</h2>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <input
                  type="text"
                  name="username"
                  id="firstname"
                  className="form-control"
                  placeholder="username"
                  onChange={inputchange}
                />
                <span style={{ color: 'red' }}>{formErrors?.username}</span>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="password"
                  onChange={inputchange}
                />
                <span style={{ color: 'red' }}>{formErrors?.password}</span>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                <button
                  type="submit"
                  value="SEND"
                  id="submit"
                  className="new-btn-d br-2 btn btn-light btn-radius btn-brd grd1 btn-block"
                  onClick={validation}
                  style={{ background: '#12557f', marginLeft: 0 }}
                >
                  Login
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Loginpage
