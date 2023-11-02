import React from 'react'

export default function AppointmentTable() {
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
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>10/11/2023</td>
                                        <td>10/15/2023</td>
                                        <td>Jayson T.</td>
                                        <td>
                                            <li>Cow</li>
                                            <li>Pig</li>
                                        </td>
                                        <td>3 Years Old</td>
                                        <td>
                                            <li>1</li>
                                            <li>3</li>
                                        </td>
                                        <td>A.I</td>
                                        <td>
                                            <span className="badge rounded-pill bg-success">Success</span>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-primary-dashboard-action btn-sm">View</button>
                                            <span> | </span>
                                            <button type="button" className="btn btn-secondary-dashboard-action btn-sm">Delete</button>
                                        </td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
