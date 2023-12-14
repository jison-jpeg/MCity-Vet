import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AppointmentTableArchive({ appointments, currentUserRole }) {

  const archivedAppointments = appointments.filter(appointment => appointment.archive === true);

  const { currentUser } = useSelector((state) => state.user);
  const isCustomer = currentUser.role === 'customer';
  const isAdmin = currentUser.role === 'admin';

  return (
    <>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">

            <h5 className="card-title">
              {isCustomer ? 'Appointment History' : 'Archived Appointments'}
            </h5>


            {archivedAppointments.length === 0 ? (
              <div className="pt-4 d-flex flex-column align-items-center mb-5 mt-5 p-5">

                <img src="/assets/images/cow.gif" alt="" />
                <div className="text-center">
                  <h5 className="card-title">Hmm. Seems like nothing's in here but me.</h5>
                  <p className="card-text">
                    {isCustomer
                      ? 'You have no appointments records.'
                      : 'No archived appointments found.'}
                  </p>
                </div>
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
                    {archivedAppointments.map((appointment) => (
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
                            {isCustomer ? null : (
                              <>
                                {/* <span> | </span> */}
                                <button type="button" className="btn btn-secondary-dashboard-action btn-sm">
                                  {isAdmin ? 'Delete' : 'Reschedule'}
                                </button>

                              </>
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