import React from 'react'
import { useSelector } from 'react-redux';

export default function LatestAppointment() {
    const { currentUser } = useSelector((state) => state.user);

  return (
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
                      <p className="card-text text-muted">1234567890</p>
                    </div>
                    <div className="col-sm-4 col-md-4 mt-2">
                      <p className="card-text fw-bold">Status</p>
                    </div>
                    <div className="col-sm-8 col-md-8 mt-2">
                      <span className="badge rounded-pill bg-danger">Pending</span>
                    </div>
                    <div className="col-sm-4 col-md-4 mt-2">
                      <p className="card-text fw-bold">Schedule</p>
                    </div>
                    <div className="col-sm-8 col-md-8 mt-2">
                      <p className="card-text text-muted">MM/DD/YYYY</p>
                    </div>
                    <div className="col-sm-4 col-md-4 mt-2">
                      <p className="card-text fw-bold">Address</p>
                    </div>
                    <div className="col-sm-8 col-md-8 mt-2">
                      <p className="card-text text-muted">Patient Address</p>
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
                      <span className='text-muted'>firstName lastName</span>
                    </div>

                    <label
                      htmlFor="example-text-input"
                      className="col-sm-4 col-md-4 mt-2"
                    >
                      Service
                    </label>
                    <div className="col-sm-8 col-md-8 mt-2">
                      <span className='text-muted'>AI, Grooming</span>
                    </div>

                    <label
                      htmlFor="example-text-input"
                      className="col-sm-4 col-md-4 mt-2"
                    >
                      Animal
                    </label>
                    <div className="col-sm-8 col-md-8 mt-2">
                      <span className='text-muted'>(2) Horse, (1) Pig</span>
                    </div>
                  </div>

                  <div className="d-flex flex-row-reverse">
                    <button type="submit" className="btn btn-primary-dashboard btn-sm rounded-pill">
                      View Appointment
                    </button>
                  </div>

                </div>
              </div>
            </div>
  )
}
