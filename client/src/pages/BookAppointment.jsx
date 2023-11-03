import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TechnicianList from '../components/TechnicianList'

export default function BookAppointment() {
  return (
    <>
    <Header />
    

    <main className="main">
  {/*----------------------------------------------
		    page header - start
		    ----------------------------------------------*/}
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
  {/*----------------------------------------------
		    page header - end
		    ----------------------------------------------*/}
  {/*----------------------------------------------
		    step bar - start
		    ----------------------------------------------*/}
 
 <div className="bg-secondary-color">
  <div className="container">
    <div className="step-bar">
      <div className="steps-progress">
        <div className="progress-indicator" style={{ width: "0%" }} />
      </div>
      <ul className="nav-step">
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

  {/*----------------------------------------------
		    step bar - end
		    ----------------------------------------------*/}

  <div className="container doctor-filter-section padding-small">
    <div className="row d-flex justify-content-center">
      <div className="col-lg-12 col-sm-8 col-10">
        <h2 className="ls-n-20 line-height-1 mb-3">Select a Technician</h2>
      </div>
    </div>
    <div className="row d-flex justify-content-center">
      <div className="col-lg-12 col-sm-8 col-10">
        <div className="doctor-filter-form d-xl-flex mb-4">

          <div className="filter-item">
            <span>on</span>
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
          <a href="" className="btn btn-form btn-primary-color">
            <span>Apply</span>
          </a>
        </div>
      </div>
    </div>
    <div className="row d-flex justify-content-center">
      <div className="col-lg-12 col-sm-8 col-10">
        <span>Showing available doctors on Decmber 21, 2020</span>
      </div>
    </div>

    <TechnicianList />

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
