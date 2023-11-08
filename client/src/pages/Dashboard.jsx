import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import TechStat from '../components/TechStat';
import AccountStat from '../components/AccountStat';


export default function Dashboard() {

  // State to manage the sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
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

  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role === 'admin';
  const isTechnicianOrSecretary = currentUser && (currentUser.role === 'technician' || currentUser.role === 'secretary');

  return (
    <>
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <DashboardSidebar toggleSidebar={toggleSidebar} />


      {/* ======= Main ======= */}
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <div className='greetings'>
          <h1>Hello, <span>{currentUser?.firstName}</span> !</h1>
        </div>

        <div className="card mb-3">
          <div className="row g-0">
            <div className="d-none d-sm-block col-4 col-sm-4 col-md-2 col-lg-2">
              <img src="/assets/img/signin/background-1-fore.png" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-sm-8 col-md-10">
              <div className="card-body">
                <h5 className="card-title">We care about your animal.</h5>
                <p className="card-text">
                  We provide the best service for your animal. Our team is always ready to help you.
                </p>
                <a href="#" className='btn btn-primary-dashboard btn-sm rounded-pill'>Book an Appointment</a>
              </div>
            </div>
          </div>
        </div>

        {/* End Page Title */}

        {/* <div className="pagetitle">
          <h1>Account Statistics</h1>
        </div> */}

        <section className="section dashboard">
          <div className="row">
            {isAdmin && (
              <>
                {isAdmin ? null : <TechStat />}
                {isTechnicianOrSecretary ? null : <AccountStat />}
              </>
            )}



            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Latest Appointment</h5>
                    <a href="#" className="btn btn-primary-dashboard btn-sm rounded-pill">View All</a>
                  </div>

                  <div className="mb-3 row">
                    <div className="col-sm-4 col-md-4 mt-2">
                      <p class="card-text fw-bold">Appointment ID</p>
                    </div>
                    <div className="col-sm-8 col-md-8 mt-2">
                      <p class="card-text text-muted">1234567890</p>
                    </div>
                    <div className="col-sm-4 col-md-4 mt-2">
                      <p class="card-text fw-bold">Status</p>
                    </div>
                    <div className="col-sm-8 col-md-8 mt-2">
                      <span className="badge rounded-pill bg-danger">Pending</span>
                    </div>
                    <div className="col-sm-4 col-md-4 mt-2">
                      <p class="card-text fw-bold">Schedule</p>
                    </div>
                    <div className="col-sm-8 col-md-8 mt-2">
                      <p class="card-text text-muted">11/02/2003</p>
                    </div>
                    <div className="col-sm-4 col-md-4 mt-2">
                      <p class="card-text fw-bold">Address</p>
                    </div>
                    <div className="col-sm-8 col-md-8 mt-2">
                      <p class="card-text text-muted">P9, Sumpong, Malaybalay City, Bukidnon</p>
                    </div>



                  </div>



                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Information</h5>
                  </div>

                  <div className="mb-5 row">
                    <label
                      htmlFor="example-text-input"
                      className="col-sm-4 col-md-4 mt-2"
                    >
                      Customer's Name
                    </label>
                    <div className="col-sm-8 col-md-8 mt-2">
                      <span className='text-muted'>John Doe</span>
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

                  <div className="">
                    <button type="submit" className="btn btn-primary-dashboard btn-s rounded-pill ">
                      Submit
                    </button>
                  </div>




                </div>
              </div>
            </div>









          </div>
        </section>


      </main>
      {/* End #main */}

      {/* ======= Footer ======= */}
      <footer id="footer" className="footer">
        <div className="copyright">
          © Copyright{" "}
          <strong>
            <span>Troubleshooters</span>
          </strong>
        </div>
        <div className="credits">

          All Rights Reserved
        </div>
      </footer>
      {/* End Footer */}
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>

    </>
  );
}
