// import React from 'react'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const dashboardStylesheet = document.getElementById('dashboard-stylesheet');
    if (dashboardStylesheet) {
      dashboardStylesheet.setAttribute('disabled', 'true');
    }

    const dashboardBootstrap = document.getElementById('dashboard-bootstrap');
    if (dashboardBootstrap) {
      dashboardBootstrap.setAttribute('disabled', 'true');
    }
  }, []);


  const handleSignout = async () => {
    try {
      dispatch(signout())
      await fetch('/api/auth/signout');
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  };

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

          <a href={currentUser ? '/dashboard' : '/book-appointment'} className="btn btn-sm btn-primary-color ls-0">
            <span>{currentUser ? 'Dashboard' : 'Book an Appointment'}</span>
          </a>

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
                <a onClick={handleSignout} className="dropdown-content">
                  Signout
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
