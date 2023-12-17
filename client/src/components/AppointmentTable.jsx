import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppointmentTable({ appointments, currentUserRole }) {

  const { currentUser } = useSelector((state) => state.user);
  const isCustomer = currentUser.role === 'customer';
  const isAdmin = currentUser.role === 'admin';

  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    // Filter medical records where archive is false
    const filtered = Array.isArray(appointments)
      ? appointments.filter((appointment) => !appointment.archive)
      : [];
    setFilteredAppointments(filtered);
  }, [appointments]);

  const handleArchive = async (appointmentId) => {
    const confirmArchive = window.confirm('Are you sure you want to archive this appointment?');
  
    if (!confirmArchive) {
      return; // User canceled the operation
    }
  
    try {
      const response = await fetch(`/backend/appointment/archive/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Update the state with the filtered appointments
        setFilteredAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
        console.log('Appointment archived successfully.');
        // Success Toast
        toast.success('Appointment archived successfully.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.error('Failed to archive appointment.');
        // Error Toast
        toast.error('Failed to archive appointment.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('An error occurred while archiving appointment:', error);
      // Error Toast
      toast.error('An error occurred while archiving appointment.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  

  return (
    <>
      <ToastContainer />
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">

            <h5 className="card-title">
              {isCustomer ? 'Appointment History' : 'Appointments'}
            </h5>


            {filteredAppointments.length === 0 ? (
              <div className="pt-4 d-flex flex-column align-items-center mb-5">

                <img src="/assets/images/cow.gif" alt="" />
                <div className="text-center">
                  <h5 className="card-title">No Appointments Yet</h5>
                  <p className="card-text">{isCustomer ? 'You have no appointments yet. Book an appointment now!' : 'You have no appointments yet.'}</p>
                </div>


                {isCustomer ? <a href="/book-appointment" className="btn btn-primary-dashboard btn-lg rounded-pill mt-3" id='book-appointment-button'>Book Appointment</a> : <button
                  type="button"
                  className="btn btn-primary-dashboard btn-lg rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                  id='book-appointment-button'
                >
                  Create Appointment
                </button>}


              </div>
            ) : (
              <div className="table-responsive-xl">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Schedule</th>
                      <th scope="col">Client</th>
                      <th scope="col">Animal</th>
                      <th scope="col">Age</th>
                      <th scope="col">No. of Heads</th>
                      <th scope="col">Services</th>
                      <th scope="col">Status</th>
                      <th scope="col" className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <th scope="row">{appointment._id}</th>
                        <td>{appointment.createdAt}</td>
                        <td>{appointment.schedule}</td>
                        <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                        <td>
                          {Array.isArray(appointment.patient) ? (
                            <ul>
                              {appointment.patient.map((patient, index) => (
                                <li key={index}>{patient.typeOfAnimal}</li>
                              ))}
                            </ul>
                          ) : (
                            appointment.patient.typeOfAnimal
                          )}
                        </td>

                        <td>
                          {Array.isArray(appointment.patient) ? (
                            <ul>
                              {appointment.patient.map((patient, index) => (
                                <li key={index}>{patient.age}</li>
                              ))}
                            </ul>
                          ) : (
                            appointment.patient.age
                          )}
                        </td>

                        <td>
                          {Array.isArray(appointment.patient) ? (
                            <ul>
                              {appointment.patient.map((patient, index) => (
                                <li key={index}>{patient.numberOfHeads}</li>
                              ))}
                            </ul>
                          ) : (
                            appointment.patient.numberOfHeads
                          )}
                        </td>

                        <td>
                          <ul>
                            {appointment.services.map((service, serviceIndex) => (
                              <li key={serviceIndex}>{service}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <span className={`badge rounded-pill ${appointment.status === 'Completed' ? 'bg-success' :
                            ((isAdmin || currentUserRole === 'secretary' || currentUserRole === 'technician') && appointment.status === 'Approved' ? 'bg-secondary' :
                              (currentUserRole === 'customer' && appointment.status === 'Approved' ? 'bg-warning' : 'bg-danger'))}`}>
                            {currentUserRole === 'customer' && appointment.status === 'Approved' ? (
                              <span className='text'>Pending</span>
                            ) : (
                              currentUserRole === 'customer' && appointment.status === 'Pending' ? (
                                <span>Waiting to Accept</span>
                              ) : (
                                (isAdmin || currentUserRole === 'secretary' || currentUserRole === 'technician') && appointment.status === 'Approved' ? 'Accepted' : appointment.status
                              )
                            )}
                          </span>
                        </td>

                        <td>
                          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>

                            <a
                              href={`/appointments/${appointment._id}`}
                              className="btn btn-primary-dashboard-action btn-sm"
                            >
                              View
                            </a>

                            {currentUserRole === 'admin' && (
                              <button
                              type="button"
                              className="btn btn-secondary-dashboard-action btn-sm"
                              onClick={() => handleArchive(appointment._id)}
                              >
                                Archive
                              </button>
                            )}

                            {(currentUserRole === 'technician' || currentUserRole === 'secretary') && (
                              <button type="button" className="btn btn-secondary-dashboard-action btn-sm">
                                Reschedule
                              </button>
                            )}

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
