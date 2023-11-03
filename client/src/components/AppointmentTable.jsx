import React from 'react'

export default function AppointmentTable({appointments}) {
    return (
        <>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Appointments</h5>

                  <div className="table-responsive-md">
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
        </>
    )
}
