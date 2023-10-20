import React from 'react'

export default function DashboardSidebar( {toggleSidebar}) {
  return (
    <>
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
      <i className="bi bi-x toggle-sidebar-btn d-block d-sm-block d-md-block d-lg-block d-xl-none" onClick={toggleSidebar} />

      <img src="assets/images/logo-mc.png" id="sidebar-logo" alt="" />

        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/dashboard">
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </a>
          </li>
          {/* End Dashboard Nav */}

          <li className="nav-item">
            <a className="nav-link collapsed" href="/appointments">
              <i className="bi bi-person" />
              <span>Appointments</span>
            </a>
          </li>
         
          <li className="nav-item">
            <a className="nav-link collapsed" href="/inventory">
              <i className="bi bi-person" />
              <span>Inventory</span>
            </a>
          </li>
          {/* End Profile Page Nav */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-faq.html">
              <i className="bi bi-question-circle" />
              <span>Medical Record</span>
            </a>
          </li>
          {/* End F.A.Q Page Nav */}
          <li className="nav-heading">SYSTEM</li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-contact.html">
              <i className="bi bi-envelope" />
              <span>Account Management</span>
            </a>
          </li>
          {/* End Contact Page Nav */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-register.html">
              <i className="bi bi-card-list" />
              <span>System Logs</span>
            </a>
          </li>
 
          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-blank.html">
              <i className="bi bi-file-earmark" />
              <span>Blank</span>
            </a>
          </li>
          {/* End Blank Page Nav */}
        </ul>
      </aside>
      {/* End Sidebar*/}
    </>

  )
}
