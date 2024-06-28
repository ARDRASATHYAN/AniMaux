import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'



function AddVaccinationcertificate() {
  const { id, pet_id } = useParams()
  console.log("hai", id);
  const navigate = useNavigate()
  const doctorid = localStorage.getItem('doctor_id');
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  const [input, setInput] = useState({
    doctor_id: doctorid,
    appoint_id: id,
    pet_id: pet_id,
    date_of_vaccination: formattedDate
  })
  const inputchange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput({ ...input, [name]: value })
  }
  const submit = (e) => {
    e.preventDefault();
    console.log(input);
    axios.post('http://localhost:4000/vaccine/vaccine', input).then((response) => {
      console.log("res===========>", response.data);
      if (response.data.success === true) {
        // Update appointment status to "completed"
        axios.put(`http://localhost:4000/appoint/appoint/${id}`, { status: 'completed' });

        navigate('/Dviewappointment');

        console.log('success');
      }
    }).catch((err) => {
      console.log(err);
    })

  }



  const [user, setUser] = useState({}); // Initialize as an object

  useEffect(() => {
    axios
      .get(`http://localhost:4000/appoint/appoint/${id}`)
      .then((response) => {
        const data = response.data.data;
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log('user', user);

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
        <div className="contact_form" style={{ maxWidth: '100%' }}>
          <div
            className="card cascading-right bg-body-tertiary"
            style={{ backdropFilter: "blur(30px)" }}
          >
            <div className="card-body p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">vaccination certificate</h2>
              <form>
                {/* 2 column grid layout with text inputs for the first and last names */}
                {/* <div className="row"> */}
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">

                      <input
                        id="ower"
                        name="u_name"
                        value={user[0]?.user_id.u_name}
                        type="text"
                        placeholder="date of vaccination"
                        className="form-control input-md"
                      />
                      <label htmlFor="dob">ownernamee
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">

                      <input
                        id="ower"
                        name="u_email"
                        value={user[0]?.user_id.u_email}
                        type="text"
                        placeholder="date of vaccination"
                        className="form-control input-md"
                      />
                      <label htmlFor="dob">email
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">

                      <input
                        id="ower"
                        name="u_Phone"
                        value={user[0]?.user_id.u_phone}
                        type="text"
                        placeholder="date of vaccination"
                        className="form-control input-md"
                      />
                      <label htmlFor="dob">phone
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">

                      <input
                        id="ower"
                        name="address"
                        value={user[0]?.user_id.address}
                        type="text"
                        placeholder="address"
                        className="form-control input-md"
                      />
                      <label htmlFor="dob">address
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">

                      <input
                        id="ower"
                        name="u_Phone"
                        value={user[0]?.breed}
                        type="text"
                        placeholder="date of vaccination"
                        className="form-control input-md"
                      />
                      <label htmlFor="dob">breed
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">

                      <input
                        id="ower"
                        name="Category"
                        value={user[0]?.Category}
                        type="text"
                        placeholder="category"
                        className="form-control input-md"
                      />
                      <label htmlFor="dob">category
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">

                      <input
                        id="ower"
                        name="gender"
                        value={user[0]?.gender}
                        type="text"
                        placeholder="gender"
                        className="form-control input-md"
                      />
                      <label htmlFor="dob">gender
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">

                      <input
                        id="ower"
                        name="age"
                        value={user[0]?.age}
                        type="text"
                        placeholder="age"
                        className="form-control input-md"
                      />
                      <label htmlFor="dob">age
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">

                      <input
                        id="ower"
                        name="date_of_vaccination"
                        value={input.date_of_vaccination}
                        type="text"
                        placeholder="date of vaccination"
                        className="form-control input-md" onChange={inputchange}
                      />
                      <label htmlFor="dob">date of vaccination
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">

                    <input
                      id="breed"
                      name="type"

                      type="text"
                      placeholder="Type of vaccination"
                      className="form-control input-md" onChange={inputchange}
                    />
                    <label htmlFor="dob">Type of vaccination</label>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">

                    <input
                      id="age"
                      name="brand"

                      type="text"
                      placeholder="brand"
                      className="form-control input-md" onChange={inputchange}
                    />
                    <label htmlFor="dob">vaccination brand</label>
                  </div>
                </div>

                <div className="col-md-12 mb-4">
                  <div className="form-floating">

                    <input
                      id="gender"
                      name="batchno"

                      type="text"
                      placeholder="batchno"
                      className="form-control input-md" onChange={inputchange}
                    />
                    <label htmlFor="dob">batch no</label>
                  </div>
                </div>

                <div class="col-md-12 mb-4">

                  <div className="form-floating">

                    <input
                      id="name"
                      name="nextdate"
                      type="date"
                      placeholder="nextdate"

                      className="form-control input-md" onChange={inputchange}
                    />
                    <label htmlFor="dob">next due date</label>
                  </div>
                </div>


                <div className="col-md-12 mb-4">
                  <button
                    id="singlebutton"
                    name="singlebutton"
                    className="new-btn-d br-2" onClick={submit}>

                    Submit
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

export default AddVaccinationcertificate
