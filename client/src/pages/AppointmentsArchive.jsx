import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import AddAppointment from '../components/modals/AddAppointment';
import AppointmentTableArchive from '../components/AppointmentTableArchive';
import Preloader from '../components/Preloader';

export default function AppointmentsArchive() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Add 'toggle-sidebar' class to the body when the button is clicked
  if (isSidebarOpen) {
    document.body.classList.add('toggle-sidebar');
  } else {
    document.body.classList.remove('toggle-sidebar');
  }

  useEffect(() => {
    const mainStylesheet = document.getElementById('main-stylesheet');
    const mainBootstrap = document.getElementById('main-bootstrap');

    const dashboardStylesheet = document.getElementById('dashboard-stylesheet');
    const dashboardBootstrap = document.getElementById('dashboard-bootstrap');

    mainStylesheet.setAttribute('disabled', 'true');
    dashboardStylesheet.removeAttribute('disabled');

    mainBootstrap.setAttribute('disabled', 'true');
    dashboardBootstrap.removeAttribute('disabled');
  }, []);

  const { currentUser } = useSelector((state) => state.user);
  const currentUserRole = currentUser.role; // Get the user's role
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!currentUser || !currentUser._id) {
        console.error('User information is missing or incomplete');
        return;
      }

      try {
        let response;
        if (currentUserRole === 'customer') {
          // Fetch appointments for customers
          response = await fetch(`/backend/user/${currentUser._id}/appointments`);
        } else if (currentUserRole === 'technician') {
          // Fetch appointments for technicians
          response = await fetch(`/backend/appointment/technician/${currentUser._id}`);
        } else if (currentUserRole === 'admin') {
          // Fetch all appointments for admin
          response = await fetch('/backend/appointment/all');
        } else if (currentUserRole === 'secretary') {
          // Fetch appointments for secretary
          response = await fetch('/backend/appointment/all');
        } else {
          console.error('Invalid user role:', currentUserRole);
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error('Failed to fetch appointments. No Appointments found.');
        }
      } catch (error) {
        console.error('An error occurred while fetching appointments', error);
      }
    };

    fetchAppointments();
  }, [currentUser, currentUserRole]);


  return (
    <>
      <Preloader />
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <DashboardSidebar toggleSidebar={toggleSidebar} />

      {/* ======= Main ======= */}
      <main id="main" className="main">
        <div className="pagetitle">
          {currentUserRole === 'customer' ? <h1>My Appointments</h1> : <h1>Appointments</h1>}
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/appointments">Appointments</a>
              </li>
              <li className="breadcrumb-item active">Archive</li>
            </ol>
          </nav>
        </div>
        <br/>
        <section className="section dashboard">
          <div className="row">
            <AppointmentTableArchive appointments={appointments} currentUserRole={currentUserRole} />
          </div>
        </section>
      </main>
      {/* End #main */}

      {/* ======= Footer ======= */}
      <footer id="footer" className="footer">
        <div className="copyright">
          © Copyright{" "}
          <strong>
            <span>Troubleshooters</span>
          </strong>
        </div>
        <div className="credits">

          All Rights Reserved
        </div>
      </footer>
      {/* End Footer */}
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short" />
      </a>
    </>
  );
}

