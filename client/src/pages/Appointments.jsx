import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import AddAppointment from '../components/modals/AddAppointment';
import AppointmentTable from '../components/AppointmentTable';


export default function Dashboard() {

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
  const isCustomer = currentUser.role === 'customer';
  const [appointments, setAppointments] = useState([]);
  const [hasPendingAppointment, setHasPendingAppointment] = useState(false);


  useEffect(() => {
    const fetchAppointments = async () => {
      if (!currentUser || !currentUser._id) {
        console.error('User information is missing or incomplete');
        return;
      }

      try {
        const response = await fetch(`/backend/user/${currentUser._id}/appointments`);
        if (response.ok) {
          const data = await response.json();

          // Check for pending appointments
          const hasPending = data.some(appointment => appointment.status === 'Pending');
          setHasPendingAppointment(hasPending);

          setAppointments(data);
          // console.log(data)
        } else {
          console.error('Failed to fetch appointments. No Appointments found.');
        }
      } catch (error) {
        console.error('An error occurred while fetching appointments', error);
      }
    };

    fetchAppointments();
  }, [currentUser]);

  return (
    <>
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <DashboardSidebar toggleSidebar={toggleSidebar} />


      {/* ======= Main ======= */}
      <main id="main" className="main">
        <div className="pagetitle">
        {isCustomer ? <h1>My Appointments</h1> : <h1>Appointments</h1>}
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active">Appointments</li>
            </ol>
          </nav>
        </div>



        <div className="btn-header">
  {isCustomer ? (
    hasPendingAppointment ? (
      <p>You have a pending appointment. Cannot make a new appointment at this time.</p>
    ) : (
      <button
        type="button"
        className="btn btn-primary-dashboard btn-lg rounded-pill"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
      >
        Book Appointment
      </button>
    )
  ) : (
    <button
      type="button"
      className="btn btn-primary-dashboard btn-lg rounded-pill"
      data-bs-toggle="modal"
      data-bs-target="#addModal"
    >
      Create Appointment
    </button>
  )}
</div>



        <AddAppointment />

        <section className="section dashboard">
          <div className="row">


            <AppointmentTable appointments={appointments} />

          </div>
        </section>


      </main>
      {/* End #main */}

      {/* ======= Footer ======= */}
      <footer id="footer" className="footer">
        <div className="copyright">
          © Copyright{" "}
          <strong>
            <span>NiceAdmin</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits">

          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
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
