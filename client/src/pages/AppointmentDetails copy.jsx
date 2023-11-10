import React, { useEffect } from 'react'
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';

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

  return (
    <>
    <DashboardHeader toggleSidebar={toggleSidebar} />
      <DashboardSidebar toggleSidebar={toggleSidebar} />

      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title">Latest Appointment</h5>
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

            <div className="card-footer text-end">
              <button type="button" className="btn btn-secondary btn-s rounded-pill m-2">
                Cancel
              </button>
              <button type="button" className="btn btn-primary-dashboard btn-s rounded-pill">
                Reschedule
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

