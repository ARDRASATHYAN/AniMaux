import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom';

function AppointmentBooking() {
  const { id } = useParams();
  const userId = localStorage.getItem('user_id');
  const [user, setUser] = useState({
    breed: '',
    Category: '',
    pet_name:'',
    age: '',
    time: '',
    date: '',
    gender: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [slot, setSlot] = useState([]);
  const [input, setInput] = useState({
    user_id: userId,
    breed: '',
    Category: '',
    age: '',
    time: '',
    date: '',
    pet_name:'',
    gender: '',
    slotId: '', // Add slotId to the state
  });
  console.log('input=>', input);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/pet/viewpet/${userId}`).then((response) => {
      setSlot(response.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [userId]);

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toLocaleTimeString();

    setUser(prevUser => ({
      ...prevUser,
      date: formattedDate,
      time: formattedTime,
    }));

    setInput(prevInput => ({
      ...prevInput,
      date: formattedDate,
      time: formattedTime,
    }));
  }, []);

  const inputchange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    const selectedSlot = slot.find(s => s[name] === value);
    setInput({ ...input, [name]: value, slotId: selectedSlot?._id });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.breed) {
      errors.breed = "breed name is required";
    }
    if (!values.Category) {
      errors.Category = "must need to select the category";
    }
    if (!values.age) {
      errors.age = "age is required";
    }
    if (!values.time) {
      errors.time = "select the time";
    }
    if (!values.gender) {
      errors.gender = "gender must be specified";
    }
    if (!values.pet_name) {
      errors.pet_name= "pet_name must be specified";
    }
    return errors;
  };

  const validation = (e) => {
    e.preventDefault();
    setFormErrors(validate(input));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/appoint/appoint`, input).then((response) => {
        console.log("res==============>", response.data);
        if (response.data.success === true) {
          window.location.reload();
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <section className="text-center text-lg-start">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .cascading-right {
                margin-right: -50px;
              }

              @media (max-width: 991.98px) {
                .cascading-right {
                  margin-right: 0;
                }
              }
            `
          }}
        />
        <div className="contact_form">
          <div className="card cascading-right bg-body-tertiary" style={{ backdropFilter: "blur(30px)" }}>
            <div className="card-body p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <form>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">
                      <input
                        id="name"
                        name="u_name"
                        value={slot[0]?.u_name}
                        type="text"
                        placeholder="username"
                        className="form-control input-md"
                        onChange={inputchange}
                        readOnly
                      />
                      <label className="control-label" htmlFor="username">OwnerName</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">
                      <select id="Category" name="pet_name" className="form-control" onChange={handleSlotChange}>
                        <option value="select">select Petname</option>
                        {slot.map((data, key) => (
                          <option key={key} value={data.pet_name}>{data.pet_name}</option>
                        ))}
                      </select>
                      <label className="control-label" htmlFor="name">Petname</label>
                    </div>
                    <span style={{ color: 'red' }}>{formErrors?.pet_name}</span>
                  </div>
                </div>
                
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">
                      <select id="Category" name="Category" className="form-control" onChange={handleSlotChange}>
                        <option value="select">select category</option>
                        {slot.map((data, key) => (
                          <option key={key} value={data.Category}>{data.Category}</option>
                        ))}
                      </select>
                      <label className="control-label" htmlFor="name">Category</label>
                    </div>
                    <span style={{ color: 'red' }}>{formErrors?.Category}</span>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">
                      <select id="breed" name="breed" className="form-control" onChange={handleSlotChange}>
                        <option value="select">select breed</option>
                        {slot.map((data, key) => (
                          <option key={key} value={data.breed}>{data.breed}</option>
                        ))}
                      </select>
                      <label className="control-label" htmlFor="breed">Breed</label>
                      <span style={{ color: 'red' }}>{formErrors?.breed}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">
                      <input
                        id="age"
                        name="age"
                        type="text"
                        placeholder="age"
                        className="form-control input-md"
                        onChange={inputchange}
                      />
                      <label className="control-label" htmlFor="age">Age</label>
                      <span style={{ color: 'red' }}>{formErrors?.age}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      id="date"
                      name="date"
                      type="text"
                      value={user.date}
                      disabled
                      className="form-control input-md"
                      onChange={inputchange}
                    />
                    <label className="control-label" htmlFor="date">Date</label>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      id="time"
                      name="time"
                      type="text"
                      value={user.time}
                      disabled
                      className="form-control input-md"
                      onChange={inputchange}
                    />
                    <label className="control-label" htmlFor="time">Time</label>
                    <span style={{ color: 'red' }}>{formErrors?.time}</span>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <select id="gender" name="gender" className="form-control" onChange={inputchange}>
                      <option value="select">select</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </select>
                    <label className="control-label" htmlFor="gender">Gender</label>
                    <span style={{ color: 'red' }}>{formErrors?.gender}</span>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={slot[0]?.u_phone}
                      placeholder="phone"
                      className="form-control input-md"
                      onChange={inputchange}
                      readOnly
                    />
                    <label className="control-label" htmlFor="phone">Phone</label>
                  </div>
                </div>

                <div className="col-md-12 mb-4">
                  <div className="form-floating">

                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={slot[0]?.u_email}
                      placeholder="email"
                      className="form-control input-md" onChange={inputchange}
                    />
                    <label className="control-label" htmlFor="email">
                      Email
                    </label>
                  </div>
                  {/* <span style={{color:'red'}}> {formErrors?.email}</span> */}
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-group">
                    <button
                      id="singlebutton"
                      name="singlebutton"
                      className="new-btn-d br-2 btn btn-light btn-radius btn-brd grd1 btn-block" onClick={validation}>

                      Make An Appointment
                    </button>
                  </div>
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

export default AppointmentBooking
