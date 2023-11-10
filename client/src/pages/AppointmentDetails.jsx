import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { useParams } from 'react-router-dom';

export default function AppointmentDetails() {
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

  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`/backend/appointment/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching appointment details: ${response.statusText}`);
        }

        const appointmentData = await response.json();
        setAppointment(appointmentData);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  return (
    <>
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <DashboardSidebar toggleSidebar={toggleSidebar} />

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>View Appointment</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/appointments">Appointment</a>
              </li>
              <li className="breadcrumb-item active">View Appointment</li>
            </ol>
          </nav>
        </div>

        {appointment && (
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">Latest Appointment</h5>
                  <a href="#" className="btn btn-primary-dashboard btn-sm rounded-pill">View All</a>
                </div>


                <div className="mb-3 row">
                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Appointment ID</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{appointment._id}</p>
                  </div>
                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Status</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <span className="badge rounded-pill bg-danger">{appointment.status}</span>
                  </div>
                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Schedule</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{appointment.schedule}</p>
                  </div>
                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Address</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{appointment.patient.address}</p>
                  </div>
                </div>


                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">Information</h5>
                </div>

                <div className="mb-4 row">
                  <label
                    htmlFor="example-text-input"
                    className="col-sm-4 col-md-4 mt-2"
                  >
                    Customer's Name
                  </label>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <span className='text-muted'>{appointment.firstName} {appointment.lastName}</span>
                  </div>

                  <label
                    htmlFor="example-text-input"
                    className="col-sm-4 col-md-4 mt-2"
                  >
                    Service
                  </label>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <span className='text-muted'>{appointment.patient.services.join(', ')}</span>
                  </div>

                  <label
                    htmlFor="example-text-input"
                    className="col-sm-4 col-md-4 mt-2"
                  >
                    Animal
                  </label>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <span className='text-muted'>{appointment.patient.typeOfAnimal}</span>
                  </div>
                </div>


                {/* <div className="d-flex flex-row-reverse">
                <button type="submit" className="btn btn-primary-dashboard btn-sm rounded-pill">
                  View Appointment
                </button>
              </div> */}
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
                  <button className="btn btn-primary-dashboard btn-sm rounded-pill" type="button">
                    Reschedule
                  </button>
                  <button className="btn btn-primary-dashboard btn-sm rounded-pill" type="button">
                    Cancel Appointment
                  </button>
                </div>

              </div>
            </div>
          </div>

        )}

      </main>

    </>
  )
}
