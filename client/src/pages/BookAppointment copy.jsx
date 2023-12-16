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
                    <span>Select a doctor</span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <div className="check-circle">2</div>
                    <span>Create profile</span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <div className="check-circle">3</div>
                    <span>Pay and finish</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 1 */}
        <div className="container technician-filter-section padding-small">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-12 col-sm-8 col-10">
              <h2 className="ls-n-20 line-height-1 mb-3">Select a Technician</h2>
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            <div className="col-lg-12 col-sm-8 col-10">
              <span>Showing available technicians on Decmber 21, 2020</span>
            </div>
          </div>

          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            className="form-control"
          />

          <TechnicianList technicians={technicians} />

          {/* Step 2 */}
          Some Content here

          <div className="pagination mt-5 justify-content-start">
            <a className="active" href="#">1</a>
            <a href="#">
              2
            </a>
            <a href="#">3</a>
            <a href="#">
              <i className="fas fa-ellipsis-h" />
            </a>
            <a href="#">12</a>
            <a href="#">
              <i className="far fa-caret-right" />
            </a>
          </div>
        </div>
        {/*----------------------------------------------
		    doctor filter section - end
		    ----------------------------------------------*/}

      </main>


      <Footer />
    </>
  )
}
