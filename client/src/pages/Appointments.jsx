import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import AddAppointment from '../components/modals/AddAppointment';
import AppointmentTable from '../components/AppointmentTable';


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
  const isCustomer = currentUser.role === 'customer';
  const [appointments, setAppointments] = useState([]);

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
          setAppointments(data);
        } else {
          console.error('Failed to fetch appointments');
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
          <h1>Appointments</h1>
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
          <button type="button" className="btn btn-primary-dashboard btn-lg rounded-pill" data-bs-toggle="modal" data-bs-target="#addModal">{isCustomer ? 'Book Appointment' : 'Add Appointment'}</button>
        </div>

        <AddAppointment />

        <section className="section dashboard">
          <div className="row">


            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Appointments</h5>

                  <div className="table-responsive-md">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Date</th>
                          <th scope="col">Schedule</th>
                          <th scope="col">Client</th>
                          <th scope="col">Animal</th>
                          <th scope="col">Age</th>
                          <th scope="col">No. of Heads</th>
                          <th scope="col">Services</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((appointment, index) => (
                          <tr key={appointment._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{appointment.createdAt}</td>
                            <td>{appointment.schedule}</td>
                            <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                            <td>{appointment.patient.typeOfAnimal}</td>
                            <td>{appointment.patient.age}</td>
                            <td>{appointment.patient.numberOfHeads}</td>
                            <td>
                              <ul>
                                {appointment.patient.services.map((service, serviceIndex) => (
                                  <li key={serviceIndex}>{service}</li>
                                ))}
                              </ul>
                            </td>
                            <td>
                              <span className={`badge rounded-pill ${appointment.status === 'Success' ? 'bg-success' : 'bg-danger'}`}>
                                {appointment.status}
                              </span>
                            </td>
                            <td>
                              <button type="button" className="btn btn-primary-dashboard-action btn-sm">View</button>
                              <span> | </span>
                              <button type="button" className="btn btn-secondary-dashboard-action btn-sm">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>



                    </table>
                  </div>

                </div>
              </div>
            </div>


            {/* <AppointmentTable /> */}


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
