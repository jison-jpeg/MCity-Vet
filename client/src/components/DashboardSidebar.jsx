import React from 'react'
import { useLocation } from 'react-router-dom';

export default function DashboardSidebar({ toggleSidebar }) {
  const location = useLocation();

  return (
    <>
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <i className="bi bi-x toggle-sidebar-btn d-block d-sm-block d-md-block d-lg-block d-xl-none" onClick={toggleSidebar} />

        <img src="assets/images/logo-mc.png" id="sidebar-logo" alt="" />

        <ul className="sidebar-nav" id="sidebar-nav">

          <li className="nav-heading">MENU</li>
          {/* Dashboard Nav */}
          <li className="nav-item">
          <a className={`nav-link ${location.pathname === '/dashboard' ? '' : 'collapsed'}`} href="/dashboard">

              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </a>
          </li>
          {/* End Dashboard Nav */}

          {/* Appointment Page Nav */}
          <li className="nav-item">
          <a className={`nav-link ${location.pathname === '/appointments' ? '' : 'collapsed'}`} href="/appointments">

              <i className="bi bi-person" />
              <span>Appointments</span>
            </a>
          </li>
          {/* End Appointment Page Nav */}

          {/* Inventory Page Nav */}
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/inventory' ? '' : 'collapsed'}`} href="/inventory">

              <i className="bi bi-person" />
              <span>Inventory</span>
            </a>
          </li>
          {/* End Inventory Page Nav */}

          {/* Medical Record Page Nav */}
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/medical-record' ? '' : 'collapsed'}`} href="/medical-record">
              <i className="bi bi-question-circle" />
              <span>Medical Record</span>
            </a>
          </li>
          {/* End Medical Record Page Nav */}

          {/* Account Management Page Nav */}
          <li className="nav-heading">SYSTEM</li>
          <li className="nav-item">
          <a className={`nav-link ${location.pathname === '/account-management' ? '' : 'collapsed'}`} href="/account-management">
              <i className="bi bi-envelope" />
              <span>Account Management</span>
            </a>
          </li>
          {/* End Account Management Page Nav */}

          {/* System Logs Page Nav */}
          <li className="nav-item">
          <a className={`nav-link ${location.pathname === '/system-logs' ? '' : 'collapsed'}`} href="/system-logs">
              <i className="bi bi-card-list" />
              <span>System Logs</span>
            </a>
          </li>
          {/* End System Logs Page Nav */}

        </ul>
      </aside>
      {/* End Sidebar*/}
    </>

  )
}
