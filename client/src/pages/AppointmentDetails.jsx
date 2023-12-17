import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import UpdateAppointment from '../components/modals/UpdateAppointment';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../components/Preloader';

export default function AppointmentDetails() {
  const { currentUser } = useSelector((state) => state.user);

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

  const fetchTechnicianDetails = async (technicianId) => {
    try {
      const response = await fetch(`/backend/technician/${technicianId}`);
      if (!response.ok) {
        throw new Error(`Error fetching technician details: ${response.statusText}`);
      }

      const technicianData = await response.json();
      return technicianData;
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`/backend/appointment/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching appointment details: ${response.statusText}`);
        }

        const appointmentData = await response.json();
        const technicianData = await fetchTechnicianDetails(appointmentData.technicianName);

        setAppointment({
          ...appointmentData,
          technicianName: `${technicianData.firstName} ${technicianData.lastName}`,
        });
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  // Accept appointment
  const acceptAppointment = async () => {
    try {
      const response = await fetch(`/backend/appointment/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Approved',
        }),
      });

      if (!response.ok) {
        throw new Error(`Error accepting appointment: ${response.statusText}`);
      }

      const updatedAppointment = await response.json();

      // Notify the customer that their appointment is accepted
      await fetch('/backend/notification/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: updatedAppointment.createdBy, // Customer's user ID
          message: 'Your appointment has been accepted!',
          type: 'success',
          appointmentId: id,
        }),
      });

      // Show a success toast
      toast.success('Appointment accepted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        ...updatedAppointment,
        technicianName: prevAppointment.technicianName,
      }));
    } catch (error) {
      console.error(error);
    }
  };


  // Complete appointment
  const completeAppointment = async () => {
    try {
      const response = await fetch(`/backend/appointment/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Completed',
        }),
      });

      if (!response.ok) {
        throw new Error(`Error completing appointment: ${response.statusText}`);
      }

      const updatedAppointment = await response.json();

      // Notify the customer that their appointment is completed
      await fetch('/backend/notification/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: updatedAppointment.createdBy, // Customer's user ID
          message: 'Your appointment has been completed!',
          type: 'success',
          appointmentId: id,
        }),
      });

      // Show a success toast
      toast.success('Appointment completed successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });


      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        ...updatedAppointment,
        technicianName: prevAppointment.technicianName,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  // Cancel appointment
  const cancelAppointment = async () => {
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
        setAppointment((prevAppointment) => ({
          ...prevAppointment,
          ...updatedAppointment,
          technicianName: prevAppointment.technicianName,
        }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Toggle archive status with a single button
  const toggleArchive = async () => {
    try {
      const response = await fetch(`/backend/appointment/archive/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          archive: !appointment.archive,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error toggling archive status: ${response.statusText}`);
      }
  
      const updatedAppointment = await response.json();
  
      // Show a success toast
      toast.success(`Appointment ${updatedAppointment.archive ? 'archived' : 'unarchived'} successfully!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        ...updatedAppointment,
        technicianName: prevAppointment.technicianName,
      }));
    } catch (error) {
      console.error('Error toggling archive status:', error);
    }
  };

  const isDisabled =
    appointment &&
    (['Cancelled', 'Completed'].includes(appointment.status) ||
      (currentUser.role === 'customer' && appointment.status === 'Approved'));


  const navigate = useNavigate();

  // Create Medical Record
  const createMedicalRecord = async () => {
    try {
      // Perform the necessary API call to create a medical record based on the appointment ID
      const response = await fetch('/backend/medical-record/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId: id, // Pass the current appointment ID
          // Add other required data for the medical record creation if needed
        }),
      });

      if (!response.ok) {
        throw new Error(`Error creating medical record: ${response.statusText}`);
      }

      const createdMedicalRecord = await response.json();
      console.log('Medical Record created successfully:', createdMedicalRecord);

      // After creating the medical record, navigate to the corresponding medical record details page
      navigate(`/medical-record/${createdMedicalRecord._id}`);
    } catch (error) {
      console.error('Error creating medical record:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  // Request to create a Medical Record and Send Notification
  const requestMedicalRecord = async () => {
    try {
      const response = await fetch(`/backend/medical-record/request/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Add other required data for the medical record creation if needed
        }),
      });

      if (!response.ok) {
        throw new Error(`Error requesting medical record: ${response.statusText}`);
      }

      const requestedMedicalRecord = await response.json();
      console.log('Medical Record request sent successfully:', requestedMedicalRecord);

      // Handle the response as needed, e.g., show a success message to the user
    } catch (error) {
      console.error('Error requesting medical record:', error);
      // Handle error, e.g., show an error message to the user
    }
  };



  return (
    <>
      <Preloader />
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <DashboardSidebar toggleSidebar={toggleSidebar} />
      <ToastContainer />

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
                  <h5 className="card-title">My Appointment</h5>
                  <div className="d-flex gap-2 justify-content-end">
                    {(currentUser.role === 'technician' || currentUser.role === 'admin' || currentUser.role === 'secretary') && (
                      <>
                        {appointment.status === 'Completed' && (
                          <button
                            className="btn btn-primary-dashboard btn-sm rounded-pill"
                            type="button"
                            onClick={createMedicalRecord}
                          >
                            Create Medical Record
                          </button>
                        )}

                        <button
                          className={`btn btn-primary-dashboard btn-sm rounded-pill ${appointment?.archive ? 'btn-danger' : 'btn-primary'
                            }`}
                          type="button"
                          onClick={toggleArchive}
                        >
                          {appointment?.archive ? 'Unarchive' : 'Archive'}
                        </button>
                      </>
                    )}

                    {(currentUser.role === 'customer' && appointment.status === 'Completed') && (
                      <button
                        className="btn btn-primary-dashboard btn-sm rounded-pill"
                        type="button"
                        onClick={requestMedicalRecord}
                      // disabled={isDisabled}
                      >
                        Request a Medical Record
                      </button>
                    )}



                  </div>
                </div>


                <div className="mb-3 row">
                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Appointment ID</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{appointment._id}</p>
                  </div>
                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Technician</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{appointment.technicianName}</p>
                  </div>

                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Status</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">


                    {appointment.status === 'Approved' ? (
                      <span className={`badge rounded-pill ${currentUser.role === 'customer' ? 'bg-warning' : 'bg-secondary'}`}>{currentUser.role === 'customer' ? 'Pending' : 'On Going'}</span>
                    ) : (
                      <span className={`badge rounded-pill ${appointment.status === 'Completed' ? 'bg-success' : 'bg-danger'}`}>
                        {currentUser.role === 'customer' && appointment.status === 'Pending' ? 'Waiting to Accept' : appointment.status}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-4 col-md-4 mt-2">
                    <p className="card-text fw-bold">Schedule</p>
                  </div>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <p className="card-text text-muted">{appointment.schedule}</p>
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
                    Address
                  </label>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <span className='text-muted'>{appointment.address}</span>
                  </div>

                  <label
                    htmlFor="example-text-input"
                    className="col-sm-4 col-md-4 mt-2"
                  >
                    Landmark
                  </label>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <span className='text-muted'>{appointment.landmark}</span>
                  </div>


                  <label
                    htmlFor="example-text-input"
                    className="col-sm-4 col-md-4 mt-2"
                  >
                    Service
                  </label>
                  <div className="col-sm-8 col-md-8 mt-2">
                    <span className='text-muted'>{appointment.services.join(', ')}</span>
                  </div>

                  <label
                    htmlFor="example-text-input"
                    className="col-sm-4 col-md-4 mt-2"
                  >
                    Animal
                  </label>
                  <div className="col-sm-8 col-md-8 mt-2">
                    {Array.isArray(appointment.patient) ? (
                      <span className='text-muted'>
                        {appointment.patient.map((patient, index) => (
                          <span key={index}>
                            {`(${patient.numberOfHeads}) ${patient.typeOfAnimal}${index < appointment.patient.length - 1 ? ', ' : ''}`}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className='text-muted'>
                        {`(${appointment.patient.numberOfHeads}) ${appointment.patient.typeOfAnimal}`}
                      </span>
                    )}
                  </div>
                </div>

                <UpdateAppointment appointment={appointment} />


                <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
                  <button
                    className="btn btn-primary-dashboard btn-sm rounded-pill"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    disabled={isDisabled || (currentUser.role === 'customer' && appointment.status === 'Approved')}
                  >
                    {currentUser.role === 'admin' ? 'Update Appointment' : 'Reschedule'}
                  </button>


                  {currentUser.role === 'customer' && (
                    <>
                      <button
                        className="btn btn-primary-dashboard btn-sm rounded-pill"
                        type="button"
                        onClick={cancelAppointment}
                        disabled={isDisabled}
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}

                  {(currentUser.role === 'technician' || currentUser.role === 'admin' || currentUser.role === 'secretary') && (
                    <>
                      {(appointment.status !== 'Completed' && appointment.status !== 'Approved') && (
                        <button
                          className="btn btn-primary-dashboard btn-sm rounded-pill"
                          type="button"
                          onClick={acceptAppointment}
                          disabled={isDisabled}
                        >
                          Accept Appointment
                        </button>
                      )}

                      {(appointment.status === 'Approved' || appointment.status === 'Completed') && (
                        <button
                          className="btn btn-primary-dashboard btn-sm rounded-pill"
                          type="button"
                          onClick={completeAppointment}
                          disabled={isDisabled}
                        >
                          Complete Appointment
                        </button>
                      )}
                    </>
                  )}


                </div>

              </div>
            </div>
          </div>

        )}

      </main>

    </>
  )
}
