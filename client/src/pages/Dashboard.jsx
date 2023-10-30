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
        {/* End Page Title */}

        <section className="section dashboard">
          <div className="row">

            {isAdmin ? null : <TechStat />}
            {isTechnicianOrSecretary ? null : <AccountStat />}



            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Appointments</h5>
                  {/* Default Table */}
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
                  {/* End Default Table Example */}
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
