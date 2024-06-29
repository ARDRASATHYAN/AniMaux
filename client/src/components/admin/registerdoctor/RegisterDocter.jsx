import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function RegisterDocter() {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    D_first_name: '',
    D_last_name: '',
    D_email: '',
    D_phone: '',
    D_certificate: '',
    D_experience: '',
    D_qualification: '',
    photo: '',
    username: '',
    password: '',
    confirm_password: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [file, setFile] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false)

  const inputChange = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const submit = (e) => {
    e.preventDefault()
    setFormErrors(validate(input))
    setIsSubmit(true)

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = new FormData()
      data.append('name', file.name)
      data.append('file', file)

      axios.post(`${process.env.REACT_APP_BACKEND_URL}/register/doctreg`, input)
        .then((response) => {
          return axios.post(`${process.env.REACT_APP_BACKEND_URL}/image/upload-image`, data)
        })
        .then((response) => {
          console.log("res==============>", response.data)
          navigate('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const validate = (values) => {
    const errors = {}
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const phoneno = /^[6-9]\d{9}$/
    const regex1 = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    const strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/

    if (!values.D_first_name) {
      errors.D_first_name = "First name is required"
    }
    if (!values.D_last_name) {
      errors.D_last_name = "Last name is required"
    }
    if (!values.username) {
      errors.username = "Username is required"
    }
    if (!values.D_qualification) {
      errors.D_qualification = "Qualification is required"
    }
    if (!values.D_experience) {
      errors.D_experience = "Experience is required"
    }
    if (!values.D_phone) {
      errors.D_phone = "Contact number is required"
    } else if (!phoneno.test(values.D_phone)) {
      errors.D_phone = "Enter a valid contact number"
    }
    if (!values.D_email) {
      errors.D_email = "Email is required"
    } else if (!regex.test(values.D_email)) {
      errors.D_email = "This is not a valid email format"
    }
    if (!values.photo) {
      errors.photo = "Photo is required"
    } else if (!regex1.test(values.photo)) {
      errors.photo = "Photo must be in the format jpeg, jpg, png"
    }
    if (!values.D_certificate) {
      errors.D_certificate = "Certificate is required"
    } else if (!regex1.test(values.D_certificate)) {
      errors.D_certificate = "Certificate must be in the format jpeg, jpg, png"
    }
    if (!values.password) {
      errors.password = "Password is required"
    } else if (!strongPassword.test(values.password)) {
      errors.password = "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    }
    if (!values.confirm_password) {
      errors.confirm_password = "Confirmation password is required"
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Password and confirm password do not match"
    }

    return errors
  }
//   const validation=( event)=>{
//     event.preventDefault();
//     setformErrors(validate(input))
//     setIsSubmit(true)
//     console.log(formErrors);
//     if(Object.keys(formErrors).length==0&&isSubmit){

//       if (file) {
//         const data = new FormData()
//         data.append('name', file.name)
//         data.append('file', file)
        
//           axios.post('http://localhost:4000/register/doctreg',input).then((response)=>{
//             axios.post('http://localhost:4000/slot/upload-image', data).then((response) => {
//             console.log("res==============>",response.data);
//             // if(response.data.success===true){
//               navigate('/login')
//             // }
//           }).catch((err)=>{
//             console.log(err);
//           })
        
//         })
//       }


    
//     }
    
   
   
// }
// if (file) {
    //   const data = new FormData()
    //   data.append('name', file.name)
    //   data.append('file', file)
    //   axios.post('http://localhost:4000/slot/upload-image', data).then((response) => {
    //     console.log(response);
    //   })
    // }
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
     
       
        <div className="contact_form">
          <div
            className="card cascading-right bg-body-tertiary"
            style={{ backdropFilter: "blur(30px)" }}
          >
            <div className="card-body p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <form onSubmit={submit}>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="D_first_name"
                        id="first_name"
                        className="form-control"
                        placeholder="First name" 
                        onChange={inputChange}
                      />
                      <span style={{ color: 'red' }}> {formErrors?.D_first_name}</span>
                      <label htmlFor="first_name">First name</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      type="text"
                      name="D_last_name"
                      id="last_name"
                      className="form-control"
                      placeholder="Last name" 
                      onChange={inputChange}
                    />
                    <span style={{ color: 'red' }}> {formErrors?.D_last_name}</span>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      type="text"
                      name="D_phone"
                      id="phone"
                      className="form-control"
                      placeholder="Your Phone" 
                      onChange={inputChange}
                    />
                    <span style={{ color: 'red' }}> {formErrors?.D_phone}</span>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      type="email"
                      name="D_email"
                      id="email"
                      className="form-control"
                      placeholder="Your Email" 
                      onChange={inputChange}
                    />
                    <span style={{ color: 'red' }}> {formErrors?.D_email}</span>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      type="file"
                      name="D_certificate"
                      id="certificate"
                      className="form-control"
                      placeholder="Certificate"
                      onChange={(e) => { setFile(e.target.files[0]); setInput({ ...input, D_certificate: e.target.files[0].name }) }}
                    />
                    <span style={{ color: 'red' }}> {formErrors?.D_certificate}</span>
                    <label htmlFor="certificate">Certificate</label>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      type="number"
                      name="D_experience"
                      id="experience"
                      className="form-control"
                      placeholder="Experience"
                      onChange={inputChange}
                    />
                    <span style={{ color: 'red' }}> {formErrors?.D_experience}</span>
                    <label htmlFor="experience">Experience</label>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="D_qualification"
                      id="qualification"
                      className="form-control"
                      placeholder="Qualification"
                      onChange={inputChange}
                    />
                    <span style={{ color: 'red' }}> {formErrors?.D_qualification}</span>
                    <label htmlFor="qualification">Qualification</label>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="profile-upload">
                    <div className="upload-img">
                      <img alt="" src="images/user.jpg" style={{ height: '55px', width: '55px' }} />
                    </div>
                    <div className="upload-input">
                      <input type="file" name="photo" className="form-control"
                        onChange={(e) => { setFile(e.target.files[0]); setInput({ ...input, photo: e.target.files[0].name }) }} />
                      <span style={{ color: 'red' }}> {formErrors?.photo}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      placeholder="Username"
                      onChange={inputChange}
                    />
                    <span style={{ color: 'red' }}> {formErrors?.username}</span>
                    <label htmlFor="username">Username</label>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={inputChange}
                    />
                    <span style={{ color: 'red' }}> {formErrors?.password}</span>
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
             
              <div className="col-md-12 mb-4">
                <div class="form-floating" >
                <input
                type="password"
                name="confirm_password"
                id="password"
                className="form-control"
                placeholder="conform password" onChange={inputChange}
              />
              <span style={{color:'red'}}> {formErrors?.confirm_password}</span>
              <label htmlFor="dob">confirmpassword</label>
                </div>
              </div>
              <div className="col-md-12 mb-4">
              <button
                type="submit"
                value="SEND"
                id="submit"
                className="new-btn-d br-2 btn btn-light btn-radius btn-brd grd1 btn-block" onClick={validate} style={{background:'#12557f', marginLeft:0}}
              ><a> Register</a>
              
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

export default RegisterDocter
