import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AppointmentTable({ appointments, currentUserRole }) {

  const { currentUser } = useSelector((state) => state.user);
  const isCustomer = currentUser.role === 'customer';

  return (
    <>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">

            <h5 className="card-title">
              {isCustomer ? 'Appointment History' : 'Appointments'}
            </h5>


            {appointments.length === 0 ? (
              <div className="card-body pt-4 d-flex flex-column align-items-center">

                <img src="assets/images/cow.gif" alt="" />
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
                <table className="table">
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
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <th scope="row">{appointment._id}</th>
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
                          <span className={`badge rounded-pill ${appointment.status === 'Complete' ? 'bg-success' : 'bg-danger'}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          <a
                            href={`/appointments/${appointment._id}`}
                            className="btn btn-primary-dashboard-action btn-sm"
                          >
                            View
                          </a>
                          <span> | </span>
                          {isCustomer ? (
                            <button type="button" className="btn btn-secondary-dashboard-action btn-sm">Reschedule</button>
                          ) : (
                            <button type="button" className="btn btn-secondary-dashboard-action btn-sm">Delete</button>
                          )}                        </td>
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
