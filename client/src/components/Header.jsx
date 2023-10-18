// import React from 'react'
import React, { useEffect } from 'react';

export default function Header() {

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
            <a href="how-it-works.html">How it works</a>
          </li>
          <li>
            <a href="treatments.html">Treatments</a>
          </li>
          <li>
            <a href="membership.html">Membership</a>
          </li>
          <li>
            <a href="help.html">Help</a>
          </li>
        </ul>{/* End .menu */}
      </nav>{/* End .main-nav */}
      <div className="header-search">
        <a href="#" className="search-toggle" role="button"><i className="fas fa-search" /></a>
        <form action="#" className="header-search-wrapper">
          <label htmlFor="q" className="sr-only">Search</label>
          <input type="search" className="form-control" name="q" id="q" placeholder="Search in..." required />
          <button type="submit" className="btn-search"><i className="fas fa-search" /></button>
        </form>
      </div>
      <a href="/book-appointment" className="btn btn-sm btn-primary-color ls-0">
        <span>Book an Appointment</span>
      </a>
      <a href="appointment-step1.html" className="icon-alt"><i className="fal fa-notes-medical" /></a>
      <a href="/signin" className="btn btn-sm btn-secondary-color ls-0 btn-login">
        <span>Sign in</span>
      </a>
      <a href="/signin" className="icon-alt"><i className="fas fa-user" /></a>
    </div>
  </div>
</header>

  )
}
