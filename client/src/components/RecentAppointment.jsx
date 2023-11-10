import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RecentAppointment({ lastAppointment }) {
  const { currentUser } = useSelector((state) => state.user);

  const appointmentId = lastAppointment?._id || 'N/A';
  const status = lastAppointment?.status || 'N/A';
  const schedule = lastAppointment?.schedule || 'N/A';
  const patientAddress = lastAppointment?.patient?.address || 'N/A';
  const customerName = `${lastAppointment?.firstName || 'N/A'} ${lastAppointment?.lastName || 'N/A'}`;
  const service = lastAppointment?.patient?.services?.join(', ') || 'N/A';
  const animal = lastAppointment?.patient?.typeOfAnimal || 'N/A';

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body mb-2">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">Latest Appointment</h5>
            <a href="/appointments" className="btn btn-primary-dashboard btn-sm rounded-pill">View All</a>
          </div>


          <div className="mb-3 row">
            <div className="col-sm-4 col-md-4 mt-2">
              <p className="card-text fw-bold">Appointment ID</p>
            </div>
            <div className="col-sm-8 col-md-8 mt-2">
              <p className="card-text text-muted">{appointmentId}</p>
            </div>
            <div className="col-sm-4 col-md-4 mt-2">
              <p className="card-text fw-bold">Status</p>
            </div>
            <div className="col-sm-8 col-md-8 mt-2">
              <span className="badge rounded-pill bg-danger">{status}</span>
            </div>
            <div className="col-sm-4 col-md-4 mt-2">
              <p className="card-text fw-bold">Schedule</p>
            </div>
            <div className="col-sm-8 col-md-8 mt-2">
              <p className="card-text text-muted">{schedule}</p>
            </div>
            <div className="col-sm-4 col-md-4 mt-2">
              <p className="card-text fw-bold">Address</p>
            </div>
            <div className="col-sm-8 col-md-8 mt-2">
              <p className="card-text text-muted">{patientAddress}</p>
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
              <span className='text-muted'>{customerName}</span>
            </div>

            <label
              htmlFor="example-text-input"
              className="col-sm-4 col-md-4 mt-2"
            >
              Service
            </label>
            <div className="col-sm-8 col-md-8 mt-2">
              <span className='text-muted'>{service}</span>
            </div>

            <label
              htmlFor="example-text-input"
              className="col-sm-4 col-md-4 mt-2"
            >
              Animal
            </label>
            <div className="col-sm-8 col-md-8 mt-2">
              <span className='text-muted'>{animal}</span>
            </div>
          </div>

          <div className="d-flex flex-row-reverse">
          <Link to={`/appointments/${lastAppointment?._id}`} className="btn btn-primary-dashboard btn-sm rounded-pill">
              View Appointment
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
