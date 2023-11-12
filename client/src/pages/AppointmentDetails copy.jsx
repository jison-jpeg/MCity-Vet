import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import UpdateAppointment from '../components/modals/UpdateAppointment';
import { useParams } from 'react-router-dom';

export default function AppointmentDetails() {
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

  const cancelAppointment = async () => {
    // Display confirmation alert
    const userConfirmed = window.confirm('Are you sure you want to cancel this appointment?');

    if (userConfirmed) {
      try {
        const response = await fetch(`/backend/appointment/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'Cancelled',
          }),
        });

        if (!response.ok) {
          throw new Error(`Error cancelling appointment: ${response.statusText}`);
        }

        const updatedAppointment = await response.json();
        setAppointment(updatedAppointment);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      }
    }
  };

  // Disable buttons if the status is Approved, Rescheduled, Cancelled, or Completed
  const isDisabled =
    appointment &&
    ['Approved', 'Rescheduled', 'Cancelled', 'Completed'].includes(appointment.status);

    const updateAppointmentDetails = async (updatedFormData) => {
      // Update the appointment details with the new form data
      try {
        const response = await fetch(`/backend/appointment/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        });
  
        if (!response.ok) {
          throw new Error(`Error updating appointment: ${response.statusText}`);
        }
  
        const updatedAppointment = await response.json();
        setAppointment(updatedAppointment);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      }
    };
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
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title">Latest Appointment</h5>
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

                {/* <UpdateAppointment /> */}


                <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
                  <button
                    className="btn btn-primary-dashboard btn-sm rounded-pill"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    disabled={isDisabled}
                  >
                    Reschedule
                  </button>
                  <button
                    className="btn btn-primary-dashboard btn-sm rounded-pill"
                    type="button"
                    onClick={cancelAppointment}
                    disabled={isDisabled}
                  >                    Cancel Appointment
                  </button>
                </div>

              </div>
            </div>
          </div>

        )}


<div className="modal fade" id="updateModal" tabIndex={-1}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Book Appointment</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <form className="row g-3">

                            <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                 
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="technician" className="form-label">
                                    Technician Name and Schedule
                                </label>
                                <select
                                    id="technician"
                                    className="form-select"
                                    required
                                
                                >
                                    <option value="">Choose...</option>
                                    <option value="1">Juan Dela Cruz</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="date" className="form-label">
                                    Date for your Appointment
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    required
                                    
                                />
                            </div>





                            <div className="col-md-3">
                                <label htmlFor="address" className="form-label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    placeholder="1234 Main St"
                                   
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="landmark" className="form-label">
                                    Landmark
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="landmark"
                                    placeholder="Juan's Store"
                                    
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="example@gmail.com"
                                    
                                    
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="phoneNumber" className="form-label">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="phoneNumber"
                                    placeholder='0912 345 6789'
                                    
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="typeOfAnimal" className="form-label">
                                    Animal Type
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="typeOfAnimal"
                                    
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="typeOfAnimal" className="form-label">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="age"
                                   
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="numberOfHeads" className="form-label">
                                    Number of Heads
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="numberOfHeads"
                                    
                                />
                            </div>


                            <div className="col align-self-end">
                                <button type="button" className="btn btn-outline-primary">
                                    Add More
                                </button>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="services" className="form-label">
                                    Services
                                </label>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save changes
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

      </main>

    </>
  )
}
