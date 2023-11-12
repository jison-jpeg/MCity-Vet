import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function AppointmentStat() {
    const { currentUser } = useSelector((state) => state.user);

    const isTechnician = currentUser.role === 'technician';
    const [appointmentStats, setAppointmentStats] = useState({
        totalAppointments: 0,
        pendingAppointments: 0,
        completeAppointments: 0,
    });

    useEffect(() => {
        // Fetch appointment stats for the current user based on role
        const fetchAppointmentStats = async () => {
            try {
                let response;

                if (isTechnician) {
                    // Fetch stats for the current technician
                    response = await fetch(`/backend/technician/${currentUser._id}/stats`);
                } else {
                    // Fetch total stats for all technicians (admin or secretary)
                    response = await fetch('/backend/appointment/stats');
                }

                if (response.ok) {
                    const data = await response.json();
                    setAppointmentStats(data);
                } else {
                    console.error('Failed to fetch appointment stats:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching appointment stats:', error);
            }
        };

        fetchAppointmentStats();
    }, [isTechnician, currentUser._id]);

    return (
        <>
            <div className="techstat col-lg-4">
                <div className="card info-card default-card">
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
                            Total Appointments
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-clipboard-plus" />
                            </div>
                            <div className="ps-3">
                                <h6>{appointmentStats.totalAppointments}</h6>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="techstat col-lg-4">
                <div className="card info-card default-card">
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
                            Pending Appointments
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-clock-history" />
                            </div>
                            <div className="ps-3">
                                <h6>{appointmentStats.pendingAppointments}</h6>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="techstat col-lg-4">
                <div className="card info-card default-card">
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
                            Complete Appointments
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-clipboard-check" />
                            </div>
                            <div className="ps-3">
                                <h6>{appointmentStats.completeAppointments}</h6>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
