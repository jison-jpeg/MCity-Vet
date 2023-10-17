import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; // Import the Google logo icon

export default function Signup() {
  useEffect(() => {
    const dashboardStylesheet = document.getElementById('dashboard-stylesheet');
    dashboardStylesheet.setAttribute('disabled', 'true');
    
    const dashboardBootstrap = document.getElementById('dashboard-bootstrap');
    dashboardBootstrap.setAttribute('disabled', 'true');
  }, []);

  return (
    <>
      <div className="loading-overlay">
        <div className="bounce-loader">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>

      {/* <Header /> */}
      {/*----------------------------------------------
	        navigation - start
	    ----------------------------------------------*/}
      <header className="header header-sign">
        <div className="header-middle header-middle-simple">
          <div className="header-left">
            <a href="/" className="logo">
              <h1 className="mb-0"><img src="assets/images/logo.png" alt="Caremed Logo" width={185} height={48} /></h1>
            </a>
          </div>
        </div>
      </header>
      {/*----------------------------------------------
	        navigation - end
	    ----------------------------------------------*/}

      <main className="main">
        <div className="height-100vh login-section signup-section position-relative bg-section bg-section-18">

          <form className="sign-form">

            <div className="form-heading text-center">
              <h4 className="sub-title ls-n-20 line-height-1 mb-3">Register Account</h4>
              <span className="heading-desc">
                Complete the form below to create your account.
              </span>
            </div>
            <div className="col-sm">
              <div className="form-content">
                <div className="input-group input-light">
                  <h6 className="input-title">Name</h6>
                  <input type="text" className="form-control" placeholder="First Name" required />
                  <input type="text" className="form-control" placeholder="Last Name" required />

                </div>
                <div className="input-group input-light">
                  <h6 className="input-title">Email</h6>
                  <input type="email" className="form-control" placeholder="example@gmail.com" required />
                </div>
                <div className="input-group input-light">
                  <h6 className="input-title">Password</h6>
                  <input type="password" className="form-control" required />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-form btn-secondary-color">
              <span>Sign Up</span>
            </button>

            <div className="term-privacy d-flex justify-content-center">
              <span className="line-height-1">or </span>
            </div>

            <button type="submit" className="btn btn-form btn-primary-color">
              <span> <FontAwesomeIcon icon={faGoogle} className='google-icon' /> Sign up with Google</span>
            </button>

            <div className="term-privacy d-flex justify-content-center">
              <span className="line-height-1">Already have an account?</span>
              <div className="btn-link">
                <a className="line-height-1" href="/signin">
                  Login
                </a>
              </div>
            </div>

          </form>


          <div className="foreground-img">
            <img src="assets/images/backgrounds/background-2-fore.png" alt="image" />
          </div>
        </div>
      </main>
    </>




  )
}
