import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import TechnicianList from '../components/TechnicianList'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function BookAppointment() {
  const [technicians, setTechnicians] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentStep, setCurrentStep] = useState(1);

  const displayStep = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= 3) {
      setCurrentStep(stepNumber);
      // You can perform additional logic here if needed
    }
  };

  useEffect(() => {
    // Fetch technician data here
    const fetchTechnicians = async () => {
      try {
        const response = await fetch('/backend/technician/all');
        if (response.ok) {
          const technicianData = await response.json();
          setTechnicians(technicianData);
        } else {
          console.error('Error fetching technicians:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };

    fetchTechnicians();
  }, []);

  const handleCheckboxChange = (event) => {
    console.log('Checkbox is checked:', event.target.checked);
    // Add your custom logic here if needed
  };

  return (
    <>
      <Header />


      <main className="main">

        <div className="page-header bg-more-light">
          <div className="container">
            <h2 className="page-title">Book appointment</h2>
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Book Appointment
                </li>
              </ol>
            </nav>
          </div>
        </div>


        <div className="bg-secondary-color d-flex align-items-center justify-content-center">
          <div className="container">
            <div className="step-bar">
              <div className="steps-progress">
                <div className="progress-indicator" style={{ width: '0%' }} />
              </div>
              <ul className="nav nav-step justify-content-between">
                <li className="nav-item active">
                  <div className="nav-link">
                    <div className="check-circle">1</div>
                    <span>Step 1</span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <div className="check-circle">2</div>
                    <span>Step 2</span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <div className="check-circle">3</div>
                    <span>Step 3</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 1 */}
        <div className="container technician-filter-section padding-small">
          <div className="row ">
            <div className="col-lg-12 col-sm-8 col-10">
              <h2 className="ls-n-20 line-height-1 mb-3">Select a Technician</h2>
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            <div className="col-lg-12 col-sm-8 col-10">
              <div className="technician-filter-form d-xl-flex mb-4">

                <div className="filter-item">
                  <span>Showing available technicians on:</span>
                  <div className="input-group input-light input-calendar-light">
                    <input
                      type="text"
                      id="form-calendar-light"
                      className="form-control"
                      placeholder="12/21/2020"
                    />
                    <i className="far fa-calendar-alt" />
                  </div>
                </div>
                <div className="ml-auto mr-1">
                  <button className="btn btn-form btn-primary-color">
                    <span>Apply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>


          <TechnicianList technicians={technicians} />
          
        </div>

        {/* Step 2 - Register / Login (Skip if Already Logged In) */}
        <div className="container apppointment-step-2-section">
          <div className="row">
            <div className="col-lg-8 offset-lg-0 col-sm-8 offset-sm-2 col-10 offset-1">
              <h2 className="ls-n-20 line-height-1">Register Account</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 offset-lg-0 col-sm-8 offset-sm-2 col-10 offset-1">
              <form className="appoint-form mb-3">
                <div className="input-group input-light">
                  <h6 className="input-title mt-0">Name</h6>
                  <input
                    type="text"
                    id='firstName'
                    className="form-control"
                    placeholder="First name"

                  />
                  <input type="text"
                    id='lastName'
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>

                <div className="input-group input-light">
                  <h6 className="input-title">Email</h6>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div className="input-group input-light">
                  <h6 className="input-title">Password</h6>
                  <input type="password" className="form-control" />
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary-color btn-form d-flex mr-auto ml-auto mb-1 mt-2"
                >
                  <span>Create Profile</span>
                </button>
                <div className="term-privacy d-flex justify-content-center m-b-3">
                  <span>Already have an account?</span>
                  <div className="btn-link">
                    <a href="/signin">Sign in</a>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>

        {/* Step 3 - Patients Info */}
        <div className="container apppointment-step-3-section">
          <div className="row">
            <div className="col-lg-12 offset-lg-0 col-sm-8 offset-sm-2 col-10 offset-1">
              <h2 className="ls-n-20 line-height-1">Patient's Details</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 offset-lg-0 col-sm-8 offset-sm-2 col-10 offset-1">

              <div>
                <form className="appoint-form mt-3 mb-5">
                  <div className="row row-joined">
                    <div className="col-md-12 col-lg-6">
                      <div className="input-group input-light">
                        <h6 className="input-title">Address</h6>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First"
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="input-group input-light">
                        <h6 className="input-title">Landmark</h6>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First"
                        />
                      </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                      <div className="input-group input-light">
                        <h6 className="input-title">Animal Type</h6>
                        <div className="form-control select-control">
                          March
                          <i className="far fa-angle-down" />
                        </div>
                        <ul className="option-menu">
                          <li className="option-list">
                            <span className="option">
                              <i className="far fa-caret-right" />
                              January
                            </span>
                          </li>
                          <li className="option-list">
                            <span className="option">
                              <i className="far fa-caret-right" />
                              February
                            </span>
                          </li>
                          <li className="option-list">
                            <span className="option">
                              <i className="far fa-caret-right" />
                              March
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                      <div className="input-group input-light">
                        <h6 className="input-title">Age</h6>
                        <input type="number" className="form-control" placeholder="Ex. 1" />
                      </div>
                    </div>
                    <div className=" col-md-12 col-lg-4">
                      <div className="input-group input-light">
                        <h6 className="input-title">Number of Heads</h6>
                        <input type="number" className="form-control" placeholder="Ex. 1" />
                      </div>
                    </div>
                    <div className="btn-link mt-2 col-md-12 col-lg-12 ml-1">
                      <a href="doctors-detailed.html">Add More</a>
                      <i className="far fa-caret-right" />
                    </div>


                    <div className="col-md-12 col-lg-12">

                      <div className="input-group input-light">
                        <h6 className="input-title">Services</h6>
                        <div>
                          <input
                            type="checkbox"
                            className="checkbox-control-input"
                            id="services1" // Unique id for the first checkbox
                          />
                          <label className="checkbox-control-label ml-1" htmlFor="services1">
                            Artificial Insemination
                          </label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            className="checkbox-control-input"
                            id="services2" // Unique id for the second checkbox
                          />
                          <label className="checkbox-control-label ml-1" htmlFor="services2">
                            Artificial Insemination
                          </label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            className="checkbox-control-input"
                            id="services3" // Unique id for the third checkbox
                          />
                          <label className="checkbox-control-label ml-1" htmlFor="services3">
                            Artificial Insemination
                          </label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            className="checkbox-control-input"
                            id="services4" // Unique id for the third checkbox
                          />
                          <label className="checkbox-control-label ml-1" htmlFor="services4">
                            Artificial Insemination
                          </label>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>





      </main>


      <Footer />
    </>
  )
}
