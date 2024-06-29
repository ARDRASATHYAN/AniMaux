import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Addservice() {
    const navigate=useNavigate()
    const[input,setInput]=useState({
      services:'',
      description:'',
 
    })
    const[formErrors,setformErrors]=useState({})
 const[isSubmit,setIsSubmit]=useState(false)

    const[file,setFile]=useState()
    const inputchange=(e)=>{
      const name=e.target.name
      const value=e.target.value
      setInput({...input,[name]:value})
    }
    const submit=(e)=>{
      e.preventDefault();
      console.log(input);
    }
    const validate = (values) => {
      const errors = {};
      if (!values.services) {
        errors.services = "breed name is required"
      }
      if (!values.description) {
        errors.description = "must need to select the category"
      }
      return errors;
    };  
    const validation=( e)=>{
      e.preventDefault();
      setformErrors(validate(input))
      setIsSubmit(true)
      console.log(formErrors);
      if(Object.keys(formErrors).length==0&&isSubmit){
    //   if (file) {
    //     const data = new FormData()
    //     data.append('name', file.name)
    //     data.append('file', file)
    //     axios.post('http://localhost:4000/slot/upload-image', data).then((response) => {
    //       console.log(response);
    //     })
    //   }
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/service/service`,input).then((response)=>{
        console.log("res===========>",response.data);
    
        if(response.data.success===true){
          window.location.reload();
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
    }
  return (
    <>
      <div className="wrapper" style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="content" style={{ width: '100%', maxWidth: '800px' }}>
        <div className="row">
          <div className="col-lg-12">
            <h4 className="page-title text-center">Add services</h4>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label text-right">Service Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="services"
                    className="form-control mb-3"
                    onChange={inputchange}
                  />
                  <span style={{ color: 'red' }}>{formErrors?.services}</span>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label text-right">Description</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="description"
                    className="form-control mb-3"
                    onChange={inputchange}
                  />
                  <span style={{ color: 'red' }}>{formErrors?.description}</span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    onClick={validation}
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Addservice
