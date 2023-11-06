import React, { useEffect, useState } from 'react';

export default function AccountStat() {
  const [roleStatistics, setRoleStatistics] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user role statistics from your backend API
    fetch('/backend/technician/role-stats')
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
    admin: 'bi bi-gear',
    technician: 'bi bi-people',
    secretary: 'bi bi-file-earmark-text',
    customer: 'bi bi-person',
  };

  // The fixed order of roles
  const roleOrder = ['admin', 'technician', 'secretary', 'customer'];

  return (
    <>
      {roleOrder.map((role) => (
        <div className="col-lg-3" key={role}>
          <div className="card info-card default-card">
            <div className="card-body">
              <h5 className="card-title">{capitalizeFirstLetter(role)}</h5>
              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className={roleIcons[role]} />
                </div>
                <div className="ps-3">
                  {isLoading ? (
                    <div
                      className="spinner-border"
                      style={{ width: 50, height: 50 }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <h6>{roleStatistics[role] || 0}</h6>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
