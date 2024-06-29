import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



function DailyDocter() {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    doctor_id: '',
    date: '',
    starttime: '',
    endtime: '',

    // profile:'',


  })
  const [formErrors, setformErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  // const[file,setFile]=useState()
  const inputchange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput({ ...input, [name]: value })
  }
  const submit = (e) => {
    e.preventDefault();
    console.log(input);
  }

  const validate = (values) => {
    const errors = {};

    if (!values.doctor_id) {
      errors.doctor_id = "doctor name is required"
    }
    if (!values.date) {
      errors.date = " need to select the date"
    }
    if (!values.starttime) {
      errors.starttime = "starttime is required"
    }
    if (!values.endtime) {
      errors.endtime = "endtime the time"
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
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/docteravaliable/slot`, input).then((response) => {
        console.log('mmm', input);
        console.log("res==============>", response.data);
        if (response.data.success === true) {
          window.location.reload();

        }
      }).catch((err) => {
        console.log(err);
      })


    }
  }
  const [user, setUser] = useState([])
  console.log(user);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/register/listdoctor`).then((response) => {
      console.log(response);
      setUser(response.data.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <>
      {/* Section: Design Block */}
      <section className="text-center text-lg-start">
        {/* <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    .cascading-right {\n      margin-right: -50px;\n    }\n\n    @media (max-width: 991.98px) {\n      .cascading-right {\n        margin-right: 0;\n      }\n    }\n  "
        }}
      /> */}
        {/* Jumbotron */}
        <div className="form">
          <div
            className="cascading-right "
            style={{ backdropFilter: "blur(30px)" }}
          >
            <div className="card-body p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <form>

                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">
                      <label>Doctor Name</label><br />
                      <select className="select" name="doctor_id" class="form-control" onChange={inputchange}>
                        <option>Select doctor</option>
                        {user.map((data, key) => (
                          <>
                            <option value={data._id}>{data.D_first_name} {data.D_last_name}</option>
                            <label htmlFor="dob">doctername</label>
                          </>
                        ))}
                      </select>
                      <span style={{ color: 'red' }}> {formErrors?.doctor_id}</span>
                    </div>

                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">

                    <div className="form-floating">


                      <input
                        type="date" name='date'
                        className="form-control" onChange={inputchange}

                      />
                      <span style={{ color: 'red' }}> {formErrors?.date}</span>
                      <label htmlFor="dob">date</label>

                    </div>

                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">


                      <input
                        type="time" name='starttime'
                        className="form-control" onChange={inputchange}

                      />
                      <span style={{ color: 'red' }}> {formErrors?.starttime}</span>
                      <label htmlFor="dob">starttime</label>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">

                    <div className="form-floating">


                      <input
                        type="time" name='endtime'
                        className="form-control" onChange={inputchange}

                      />
                      <span style={{ color: 'red' }}> {formErrors?.endtime}</span>
                      <label htmlFor="dob">end time</label>
                    </div>

                  </div>
                </div>


                <div className="col-md-12 mb-4">
                  <button type="submit"
                    value="SEND"
                    id="submit" className="btn btn-primary submit-btn" onClick={validation}>
                    Create Schedule
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

export default DailyDocter
