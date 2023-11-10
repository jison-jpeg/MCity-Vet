import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function DashboardSidebar({ toggleSidebar }) {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser.role === 'admin';
  const isCustomer = currentUser.role === 'customer';


  return (
    <>
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <i className="bi bi-x toggle-sidebar-btn d-block d-sm-block d-md-block d-lg-block d-xl-none" onClick={toggleSidebar} />

        <a href="/dashboard"><img src="/assets/images/logo-mc.png" id="sidebar-logo" alt="" /></a>

        <ul className="sidebar-nav" id="sidebar-nav">

          <li className="nav-heading">MENU</li>

          {/* Dashboard Nav */}
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/dashboard' ? '' : 'collapsed'}`} href="/dashboard">

              <i className="bi bi-grid" />
              <span>{isCustomer ? 'Home' : 'Dashboard'}</span>
            </a>
          </li>
          {/* End Dashboard Nav */}

          {/* Appointment Page Nav */}
          <li className="nav-item">
          <a className={`nav-link ${location.pathname.startsWith('/appointments') ? '' : 'collapsed'}`} href="/appointments">

              <i className="bi bi-person" />
              <span>{isCustomer ? 'My Appointment' : 'Appointments'}</span>            </a>
          </li>
          {/* End Appointment Page Nav */}

          {/* Inventory Page Nav */}
          {isAdmin && (
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/inventory' ? '' : 'collapsed'}`} href="/inventory">

              <i className="bi bi-person" />
              <span>Inventory</span>
            </a>
          </li>
          )}
          {/* End Inventory Page Nav */}

          {/* Medical Record Page Nav */}
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/medical-record' ? '' : 'collapsed'}`} href="/medical-record">
              <i className="bi bi-question-circle" />
              <span>Medical Record</span>
            </a>
          </li>
          {/* End Medical Record Page Nav */}

          {/* User Page Nav */}
          <li className="nav-heading">USER</li>
          <li className="nav-item">
            <a className={`nav-link ${location.pathname === '/profile' ? '' : 'collapsed'}`} href="/profile">
              <i className="bi bi-card-list" />
              <span>Profile</span>
            </a>
          </li>
          {/* End User Page Nav */}

          {/* Account Management Page Nav */}
          {isAdmin && (
            <div>

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

            </div>
          )}
          {/* End System Logs Page Nav */}

        </ul>
      </aside>
      {/* End Sidebar*/}
    </>

  )
}
