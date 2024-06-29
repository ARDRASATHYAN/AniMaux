import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../home/navbar/Navbar';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function Addpriscription() {
  const doctorid = localStorage.getItem('doctor_id');
  const { id, pet_id } = useParams();

  const navigate = useNavigate()
  const [user, setUser] = useState([]);
  const [formValues, setFormValues] = useState({
    u_name: '',
    petname: '',
    date: '',
    prescriptions: [{ prescription: '', times: '', days: '' }]
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/appoint/appoint/${id}`)
      .then((response) => {
        const data = response.data.data[0] || {};
        setUser(data);
        setFormValues({
          u_name: data.user_id.u_name || '',
          petname: data.breed || '',
          date: data.date || '',
          prescriptions: [{ prescription: '', times: '', days: '' }]
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleAddPrescription = () => {
    setFormValues({
      ...formValues,
      prescriptions: [...formValues.prescriptions, { prescription: '', times: '', days: '' }]
    });
  };

  const handlePrescriptionChange = (index, field, event) => {
    const newPrescriptions = formValues.prescriptions.map((prescription, i) => {
      if (i === index) {
        return { ...prescription, [field]: event.target.value };
      }
      return prescription;
    });
    setFormValues({
      ...formValues,
      prescriptions: newPrescriptions
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/prescription/prescription`, {
        doctor_id: doctorid,
        appoint_id: id,
        pet_id: pet_id,
        prescriptions: formValues.prescriptions,
      })
      .then((response) => {
        console.log('data=>', response.data);
        if (response.data.success === true) {
          // Update appointment status to "completed"
          axios.put(`${process.env.REACT_APP_BACKEND_URL}/appoint/appoint/${id}`, { status: 'completed' });

          navigate('/Dviewappointment');

          console.log('success');
        }
      })
      .catch((err) => {
        console.log('Error adding prescription:', err);
      });
  };
  console.log('hello', formValues?.petname);
  return (
    <>

      <section className="text-center text-lg-start">
        <div className="contact_form" style={{ maxWidth: '100%' }}>
          <div
            className="card cascading-right bg-body-tertiary"
            style={{ backdropFilter: 'blur(30px)' }}
          >
            <div className="card-body p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Prescription</h2>
              <form onSubmit={handleSubmit}>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="u_name"
                        value={formValues?.u_name}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="owner name"
                      />
                      <label htmlFor="u_name">Owner Name</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div data-mdb-input-init="" className="form-outline">
                    <input
                      type="text"
                      name="petname"
                      value={formValues?.petname}
                      onChange={handleInputChange}
                      className="form-control "
                      placeholder="pet name"
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="date"
                      value={formValues.date}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="date"
                    />
                    <label htmlFor="date">Date</label>
                  </div>
                </div>
                {formValues.prescriptions.map((prescription, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-4 mb-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          name={`prescription-${index}`}
                          value={prescription.prescription}
                          onChange={(event) => handlePrescriptionChange(index, 'prescription', event)}
                          className="form-control"
                          placeholder="prescription"
                        />
                        <label htmlFor={`prescription-${index}`}>Prescription</label>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          name={`times-${index}`}
                          value={prescription.times}
                          onChange={(event) => handlePrescriptionChange(index, 'times', event)}
                          className="form-control"
                          placeholder="times"
                        />
                        <label htmlFor={`times-${index}`}>Times</label>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          name={`days-${index}`}
                          value={prescription.days}
                          onChange={(event) => handlePrescriptionChange(index, 'days', event)}
                          className="form-control"
                          placeholder="days"
                        />
                        <label htmlFor={`days-${index}`}>Days</label>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-md-12 mb-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ fontSize: '24px' }}
                    onClick={handleAddPrescription}
                  >
                    <i className="fa fa-plus"></i> Add Prescription
                  </button>
                </div>
                <div className="col-md-12 mb-4">
                  <button
                    type="submit"
                    className="new-btn-d br-2 btn btn-light btn-radius btn-brd grd1 btn-block"
                    style={{ background: '#12557f', marginLeft: 0 }}
                  >
                    ADD
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Addpriscription
