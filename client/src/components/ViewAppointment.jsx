import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import TechStat from '../components/TechStat';
import AccountStat from '../components/AccountStat';


export default function ViewAppointment() {

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

    return (
        <>
            <DashboardHeader toggleSidebar={toggleSidebar} />
            <DashboardSidebar toggleSidebar={toggleSidebar} />


            {/* ======= Main ======= */}
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>View Appointment</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/dashboard">Home</a>
                            </li>
                            <li className="breadcrumb-item active">Appointment</li>
                        </ol>
                    </nav>
                </div>


                {/* End Page Title */}

                {/* <div className="pagetitle">
          <h1>Account Statistics</h1>
        </div> */}

                <section className="section dashboard">
                    <div className="row">

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
