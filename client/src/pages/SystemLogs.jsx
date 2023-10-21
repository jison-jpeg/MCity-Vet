import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import AddAppointment from '../components/modals/AddItem';


export default function SystemLogs() {

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
                    <h1>System Logs</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/dashboard">Home</a>
                            </li>
                            <li className="breadcrumb-item active">System Logs</li>
                        </ol>
                    </nav>
                </div>

                <br />
                
                <AddAppointment />

                <section className="section dashboard">
                    <div className="row">

                        {/* add data table */}

                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">System Logs</h5>
                                    {/* Default Table */}
                                    <div className="table-responsive-md">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Record ID</th>
                                                    <th scope="col">Appointment ID</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Client Name</th>
                                                    <th scope="col">Animal</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Service</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>REC-abc123</td>
                                                    <td>APP-abc123</td>
                                                    <td>10/15/2023</td>
                                                    <td>Jayson T.</td>
                                                    <td>Cow</td>
                                                    <td>2</td>
                                                    <td>A.I</td>
                                                    <td>
                                                        <button type="button" class="btn btn-primary-dashboard-action btn-sm">View</button>
                                                        <span> | </span>
                                                        <button type="button" class="btn btn-secondary-dashboard-action btn-sm">Delete</button>
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
