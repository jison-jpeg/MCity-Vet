import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';


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
        {/* End Page Title */}

        <section className="section dashboard">
          <div className="row">
          <div className="col-lg-4">
              <div className="card info-card sales-card">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Sales <span>| Today</span>
                  </h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-cart" />
                    </div>
                    <div className="ps-3">
                      <h6>145</h6>
                      <span className="text-success small pt-1 fw-bold">12%</span>{" "}
                      <span className="text-muted small pt-2 ps-1">increase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-lg-4">
              <div className="card info-card sales-card">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Sales <span>| Today</span>
                  </h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-cart" />
                    </div>
                    <div className="ps-3">
                      <h6>145</h6>
                      <span className="text-success small pt-1 fw-bold">12%</span>{" "}
                      <span className="text-muted small pt-2 ps-1">increase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-lg-4">
              <div className="card info-card sales-card">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Sales <span>| Today</span>
                  </h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-cart" />
                    </div>
                    <div className="ps-3">
                      <h6>145</h6>
                      <span className="text-success small pt-1 fw-bold">12%</span>{" "}
                      <span className="text-muted small pt-2 ps-1">increase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            {/* add data table */}

          </div>
        </section>


      </main>
      {/* End #main */}

      {/* ======= Footer ======= */}
      <footer id="footer" className="footer">
        <div className="copyright">
          © Copyright{" "}
          <strong>
            <span>NiceAdmin</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits">

          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
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
