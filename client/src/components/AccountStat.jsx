import React, { useEffect, useState } from 'react';

export default function AccountStat() {

    const [roleStatistics, setRoleStatistics] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch user role statistics from your backend API
        fetch('/backend/user/role-stats')
            .then((response) => response.json())
            .then((data) => {
                setRoleStatistics(data);
                setIsLoading(false); // Data is now available, set isLoading to false
            })
            .catch((error) => console.error('Error fetching role statistics:', error));
    }, []);

    // Helper function to capitalize the first letter
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const roleIcons = {
        admin: 'bi bi-people',
        technician: 'bi bi-gear',
        secretary: 'bi bi-file-earmark-text',
        customer: 'bi bi-clipboard-check',
    };

    // The fixed order of roles
    const roleOrder = ['admin', 'technician', 'secretary', 'customer'];


    return (
        <>
            {roleOrder.map((role) => (

                <div className="col-lg-3" key={role}>
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
                                {capitalizeFirstLetter(role)}

                            </h5>
                            <div className="d-flex align-items-center">
                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i className={roleIcons[role]} />
                                </div>
                                <div className="ps-3">
                                    {isLoading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <h6>{roleStatistics[role]}</h6>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ))}

        </>
    )
}
