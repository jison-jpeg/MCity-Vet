import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import AppointmentStat from '../components/AppointmentStat';
import AccountStat from '../components/AccountStat';
import RecentAppointment from '../components/RecentAppointment';
import Preloader from '../components/Preloader';

export default function Dashboard() {

  // State to manage the sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
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
  const isAdmin = currentUser && currentUser.role === 'admin';
  const isCustomer = currentUser && currentUser.role === 'customer';
  const isTechnician = currentUser && currentUser.role === 'technician';
  const isSecretary = currentUser && currentUser.role === 'secretary';
  const [lastAppointment, setLastAppointment] = useState(null);

  useEffect(() => {
    const fetchLastAppointment = async () => {
      if (isCustomer && currentUser && currentUser._id) {
        try {
          const response = await fetch(`/backend/user/${currentUser._id}/appointments`);
          if (response.ok) {
            const appointments = await response.json();
            if (appointments.length > 0) {
              const last = appointments[appointments.length - 1];
              setLastAppointment(last);
            }
          } else {
            console.error('Failed to fetch appointments:', response.status);
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      }
    };

    fetchLastAppointment();
  }, [currentUser, isCustomer]);


  return (
    <>
      <Preloader />
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <DashboardSidebar toggleSidebar={toggleSidebar} />


      {/* ======= Main ======= */}
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <div className='greetings'>
          <h1>Hello, <span>{currentUser?.firstName}</span> !</h1>
        </div>

        {(isCustomer || isAdmin || isSecretary) && (
          <>
            <div className="card mb-3">
              <div className="row g-0">
                <div className="d-none d-sm-block col-4 col-sm-4 col-md-2 col-lg-2">
                  <img src="/assets/img/signin/background-1-fore.png" className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-sm-8 col-md-10">
                  <div className="card-body">
                    <h5 className="card-title">We care about your animal.</h5>
                    <p className="card-text">
                      We provide the best service for your animal. Our team is always ready to help you.
                    </p>
                    <a href="/book-appointment" className='btn btn-primary-dashboard btn-sm rounded-pill'>Book an Appointment</a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}


        <section className="section dashboard">
          <div className="row">
            
            {isAdmin && <AccountStat />}
            {(isTechnician || isSecretary) && <AppointmentStat />}
            {isCustomer && <RecentAppointment lastAppointment={lastAppointment} />}

          </div>
        </section>


      </main>

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
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>

    </>
  );
}
