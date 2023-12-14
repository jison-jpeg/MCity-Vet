import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { useSelector } from 'react-redux';
import Preloader from '../components/Preloader';
import MedicalRecordTableArchive from '../components/MedicalRecordTableArchive';


export default function MedicalRecord() {

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
            <Preloader />
            <DashboardHeader toggleSidebar={toggleSidebar} />
            <DashboardSidebar toggleSidebar={toggleSidebar} />


            {/* ======= Main ======= */}
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Medical Record</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/dashboard">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="/medical-record">Medical Record</a>
                            </li>
                            <li className="breadcrumb-item active">Archive</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Archived Medical Records</h5>
                                    <div className="table-responsive-md">

                                        <MedicalRecordTableArchive />

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
