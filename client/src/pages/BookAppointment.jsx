import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item active">
            <a href="index.html">Pages</a>
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
  {/*----------------------------------------------
		    doctor filter section - start
		    ----------------------------------------------*/}
  <div className="container doctor-filter-section padding-small">
    <div className="row d-flex justify-content-center">
      <div className="col-lg-12 col-sm-8 col-10">
        <h2 className="ls-n-20 line-height-1 mb-3">Select a doctor</h2>
      </div>
    </div>
    <div className="row d-flex justify-content-center">
      <div className="col-lg-12 col-sm-8 col-10">
        <div className="doctor-filter-form d-xl-flex mb-4">
          <div className="filter-item">
            <span className="ls-0">Showing doctors in:</span>
            <div className="input-group input-light">
              <input
                type="text"
                className="form-control"
                placeholder="Alabama"
              />
            </div>
          </div>
          <div className="filter-item">
            <span>for</span>
            <div className="input-group input-light">
              <div className="form-control select-control">
                My Children
                <i className="far fa-angle-down" />
              </div>
              <ul className="option-menu">
                <li className="option-list">
                  <span className="option">
                    <i className="far fa-caret-right" />
                    Myself
                  </span>
                </li>
                <li className="option-list">
                  <span className="option">
                    <i className="far fa-caret-right" />
                    My Children
                  </span>
                </li>
                <li className="option-list">
                  <span className="option">
                    <i className="far fa-caret-right" />
                    My Parents
                  </span>
                </li>
                <li className="option-list">
                  <span className="option">
                    <i className="far fa-caret-right" />
                    Someone Else
                  </span>
                </li>
              </ul>
            </div>
          </div>
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
    <div className="row d-flex justify-content-center">
      <div className="col-lg-12 col-sm-8 col-10">
        <div className="doctor-menu mt-3">
          <div className="blog blog-doctor d-md-flex">
            <figure>
              <img
                src="assets/images/avatar/avatar-1.png"
                className="avatar"
                alt="Avatar"
                width={143}
                height={143}
              />
            </figure>
            <div className="blog-content">
              <h4 className="doctor-name mb-0 ls-n-20">Dr. George Brown</h4>
              <div className="ratings-container">
                <div className="ratings">
                  <div className="ratings-val" style={{ width: "100%" }} />
                </div>
                <span>4.9/5.0</span>
              </div>
              <p className="doctor-info">
                Top 50 Medical School <span className="text-divider">|</span> 6
                years experience
              </p>
              <p className="doctor-Availability">
                Availability <i className="far fa-clock" /> 9:00 PM CDT
              </p>
              <div className="btn-link">
                <a href="doctors-detailed.html">Profile and Reviews</a>
                <i className="far fa-caret-right" />
              </div>
            </div>
            <a
              href="appointment-step2.html"
              className="btn btn-form btn-secondary-color"
            >
              <span>Book</span>
            </a>
          </div>
          <div className="blog blog-doctor d-md-flex">
            <figure>
              <img
                src="assets/images/avatar/avatar-2.png"
                className="avatar"
                alt="Avatar"
                width={143}
                height={143}
              />
            </figure>
            <div className="blog-content">
              <h4 className="doctor-name mb-0 ls-n-20">Dr. James Benjamin</h4>
              <div className="ratings-container">
                <div className="ratings">
                  <div className="ratings-val" style={{ width: "100%" }} />
                </div>
                <span>5.0/5.0</span>
              </div>
              <p className="doctor-info">
                Top 50 Medical School <span className="text-divider">|</span> 7
                years experience
              </p>
              <p className="doctor-Availability">
                Availability <i className="far fa-clock" /> 9:00 PM CDT
              </p>
              <div className="btn-link">
                <a href="doctors-detailed.html">Profile and Reviews</a>
                <i className="far fa-caret-right" />
              </div>
            </div>
            <a
              href="appointment-step2.html"
              className="btn btn-form btn-secondary-color"
            >
              <span>Book</span>
            </a>
          </div>
          <div className="blog blog-doctor d-md-flex">
            <figure>
              <img
                src="assets/images/avatar/avatar-3.png"
                className="avatar"
                alt="Avatar"
                width={143}
                height={143}
              />
            </figure>
            <div className="blog-content">
              <h4 className="doctor-name mb-0 ls-n-20">Dr. Amelia Cameron</h4>
              <div className="ratings-container">
                <div className="ratings">
                  <div className="ratings-val" style={{ width: "100%" }} />
                </div>
                <span>4.8/5.0</span>
              </div>
              <p className="doctor-info">
                Top 50 Medical School <span className="text-divider">|</span> 6
                years experience
              </p>
              <p className="doctor-Availability">
                Availability <i className="far fa-clock" /> 9:00 PM CDT
              </p>
              <div className="btn-link">
                <a href="doctors-detailed.html">Profile and Reviews</a>
                <i className="far fa-caret-right" />
              </div>
            </div>
            <a
              href="appointment-step2.html"
              className="btn btn-form btn-secondary-color"
            >
              <span>Book</span>
            </a>
          </div>
          <div className="blog blog-doctor d-md-flex">
            <figure>
              <img
                src="assets/images/avatar/avatar-4.png"
                className="avatar"
                alt="Avatar"
                width={143}
                height={143}
              />
            </figure>
            <div className="blog-content">
              <h4 className="doctor-name mb-0 ls-n-20">Dr. William Bowling</h4>
              <div className="ratings-container">
                <div className="ratings">
                  <div className="ratings-val" style={{ width: "100%" }} />
                </div>
                <span>4.7/5.0</span>
              </div>
              <p className="doctor-info">
                Top 50 Medical School <span className="text-divider">|</span> 7
                years experience
              </p>
              <p className="doctor-Availability">
                Availability <i className="far fa-clock" /> 9:00 PM CDT
              </p>
              <div className="btn-link">
                <a href="doctors-detailed.html">Profile and Reviews</a>
                <i className="far fa-caret-right" />
              </div>
            </div>
            <a
              href="appointment-step2.html"
              className="btn btn-form btn-secondary-color"
            >
              <span>Book</span>
            </a>
          </div>
          <div className="blog blog-doctor d-md-flex">
            <figure>
              <img
                src="assets/images/avatar/avatar-5.png"
                className="avatar"
                alt="Avatar"
                width={143}
                height={143}
              />
            </figure>
            <div className="blog-content">
              <h4 className="doctor-name mb-0 ls-n-20">Dr. Stephanie Moor</h4>
              <div className="ratings-container">
                <div className="ratings">
                  <div className="ratings-val" style={{ width: "100%" }} />
                </div>
                <span>4.2/5.0</span>
              </div>
              <p className="doctor-info">
                Top 50 Medical School <span className="text-divider">|</span> 7
                years experience
              </p>
              <p className="doctor-Availability">
                Availability <i className="far fa-clock" /> 9:00 PM CDT
              </p>
              <div className="btn-link">
                <a href="doctors-detailed.html">Profile and Reviews</a>
                <i className="far fa-caret-right" />
              </div>
            </div>
            <a
              href="appointment-step2.html"
              className="btn btn-form btn-secondary-color"
            >
              <span>Book</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="pagination mt-5 justify-content-start">
      <a href="#">1</a>
      <a className="active" href="#">
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
