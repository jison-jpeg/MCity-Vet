// import React from 'react'
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const dashboardStylesheet = document.getElementById('dashboard-stylesheet');
    dashboardStylesheet.setAttribute('disabled', 'true');

    const dashboardBootstrap = document.getElementById('dashboard-bootstrap');
    dashboardBootstrap.setAttribute('disabled', 'true');
  }, []);

  return (
    <header className="header">

      <div className="header-middle sticky-header">
        <div className="header-left">
          <a href="/" className="logo">
            <h1 className="mb-0"><img src="assets/images/logo.png" alt="Caremed Logo" width={185} height={48} /></h1>
          </a>
        </div>
        <div className="header-right">
          <button className="mobile-menu-toggler">
            <span className="sr-only">Toggle mobile menu</span>
            <i className="fal fa-bars" />
          </button>
          <nav className="main-nav ls-20">
            <ul className="menu sf-arrows">

              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/about-us">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>


            </ul>
          </nav>
          {/* End .main-nav */}

          <a href="/book-appointment" className="btn btn-sm btn-primary-color ls-0">
            <span>Book an Appointment</span>
          </a>

          {/* <a href="/signin" className="btn btn-sm btn-secondary-color ls-0 btn-login">
            <span>Sign in</span>
          </a>
          <a href="/signin" className="icon-alt"><i className="fas fa-user" /></a> */}

          {/* <div className="dropdown menu icon-alt" id="profile-nav">
            <input type="checkbox" className="dropdown-checkbox" id="dropdown-toggle" />
            <label
              className="profile-image-label dropdown-label"
              htmlFor="dropdown-toggle"
            >
              <img src={currentUser?.profilePicture} alt="profile" width={50}
                height={50} className='rounded-circle sf-with-ul' />
            </label>

            <div className="dropdown-content-container">
              <a href="#" className="dropdown-content ">
                Profile
              </a>
              <div className="arrow"></div>

              <a href="#" className="dropdown-content">
                Settings
              </a>
              <a href="#" className="dropdown-content">
                Logout
              </a>

            </div>

          </div> */}

          {currentUser ? (
            <div className="dropdown menu icon-alt" id="profile-nav">
              <input type="checkbox" className="dropdown-checkbox" id="dropdown-toggle" />
              <label
                className="profile-image-label dropdown-label"
                htmlFor="dropdown-toggle"
              >
                <img src={currentUser?.profilePicture} width={50}
                  height={50} className='rounded-circle object-cover' />
              </label>

              <div className="dropdown-content-container">
                <a href="/profile" className="dropdown-content ">
                  Profile
                </a>
                <div className="arrow"></div>

                <a href="#" className="dropdown-content">
                  Settings
                </a>
                <a href="#" className="dropdown-content">
                  Logout
                </a>

              </div>

            </div>
          ) : (
            <div>
              <a href="/signin" className="btn btn-sm btn-secondary-color ls-0 btn-login">
                <span>Sign in</span>
              </a>
              <a href="/signin" className="icon-alt"><i className="fas fa-user" /></a>
            </div>
          )}

        </div>
      </div>
    </header>




  )
}
