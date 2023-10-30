import React from 'react'

export default function TechStat() {
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
                            Today's Appointments
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-clipboard-plus" />
                            </div>
                            <div className="ps-3">
                                <h6>145</h6>

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
                                <h6>145</h6>

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
                            Served Appointments
                        </h5>
                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                <i className="bi bi-clipboard-check" />
                            </div>
                            <div className="ps-3">
                                <h6>145</h6>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}