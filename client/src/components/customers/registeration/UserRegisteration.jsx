import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import user from './images/user.jpg';

function UserRegisteration() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [input, setInput] = useState({
    u_name: "",
    u_email: "",
    u_phone: "",
    address: "",
    photo: "",
    username: "",
    password: "",
    confirm_password: ""
  })


  const [formErrors, setformErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [file, setFile] = useState()
  const inputchange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput({ ...input, [name]: value })
  }
  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    var phoneno = /^[6-9]\d{9}$/;
    const regex1 = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    if (!values.u_name) {
      errors.u_name = "enter name"
    }
    if (!values.username) {
      errors.username = "enter name"
    }
    if (!values.address) {
      errors.address = "enter your address"
    }

    if (!values.photo) {
      errors.photo = "photo Number is required!";
    } else if (!regex1.test(values.photo)) {
      errors.photo = "photo must be in the format jpeg,jpg ,png !";
    }

    //mobile num validation
    if (!values.u_phone) {
      errors.u_phone = "Contact Number is required!";
    } else if (!phoneno.test(values.u_phone)) {
      errors.u_phone = "Enter valid Contact Number !";
    }

    //email validation
    if (!values.u_email) {
      errors.u_email = "email is required!";
    }
    else if (!regex.test(values.u_email)) {
      errors.u_email = "This is not a valid email format!";
    }

    //password validation
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "Confirmation Password is required";
    } else if (values.password != values.confirm_password) {
      errors.password = "Password and confirm password not matching";
    }
    else if (!strongPassword.test(values.password)) {
      errors.password = "Password must contain alphabet, digit,special Charecters";
    }

    return errors;
  };
  const validation = (event) => {
    event.preventDefault();

    setformErrors(validate(input))
    setIsSubmit(true)
    console.log(formErrors);
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      console.log(input);
      if (file) {
        const data = new FormData()
        data.append('name', file.name)
        data.append('file', file)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/register/userreg`, input).then((response) => {
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/image/upload-image`, data).then((response) => {
            if (response.data.success === true) {
              navigate('/login');
            }
          }).catch((err) => {
            console.log(err);
          })
        })
      }


    }

  }
  return (
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
                {/* 2 column grid layout with text inputs for the first and last names */}
                {/* <div className="row"> */}
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      type="text"
                      name="u_name"
                      id="first_name"
                      className="form-control"
                      placeholder="First Name" onChange={inputchange}
                    />
                    <span style={{ color: 'red' }}> {formErrors?.u_name}</span>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      type="email"
                      name="u_email"
                      id="email"
                      className="form-control"
                      placeholder="Your Email" onChange={inputchange}
                    />
                    <span style={{ color: 'red' }}> {formErrors?.u_email}</span>
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
                    <textarea className="form-control" name='address' placeholder='address' onChange={inputchange}>
                    </textarea>
                    <span style={{ color: 'red' }}> {formErrors?.address}</span>
                  </div>
                </div>

                <div class="col-md-12 mb-4">
                  <div class="profile-upload">
                    <div class="upload-img">
                      <img alt="" src={user} style={{ height: '55px', width: '55px' }} />
                    </div>
                    <div class="upload-input">
                      <input type="file" name="photo" class="form-control" onChange={(e) => { setFile(e.target.files[0]); setInput({ ...input, photo: e.target.files[0].name }) }} />
                      <span style={{ color: 'red' }}> {formErrors?.photo}</span>
                    </div>
                  </div>
                </div>


                <div className="col-md-12 mb-4">

                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    placeholder="Username" onChange={inputchange}
                  />
                  <span style={{ color: 'red' }}> {formErrors?.username}</span>
                </div>
                <div className="col-md-12 mb-4">

                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="password" onChange={inputchange}
                  />
                  <span style={{ color: 'red' }}> {formErrors?.password}</span>
                </div>
                <div className="col-md-12 mb-4">

                  <input
                    type="password"
                    name="confirm_password"
                    className="form-control"
                    placeholder="conform password" onChange={inputchange}
                  />
                  <span style={{ color: 'red' }}> {formErrors?.confirm_password}</span>
                </div>
                <div className="col-md-12 mb-4">
                  <button
                    type="button"
                    value="SEND"
                    id="submit"
                    className="new-btn-d br-2 btn btn-light btn-radius btn-brd grd1 btn-block" onClick={validation} style={{ background: '#12557f', marginLeft: 0 }}
                  ><a >Register</a>

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

  )
}

export default UserRegisteration
