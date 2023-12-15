import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import AccountStat from '../components/AccountStat';
import AddAccount from '../components/modals/AddAccount';
import { useSelector } from 'react-redux';
import Preloader from '../components/Preloader';

export default function AccountManagement() {
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

  const [accounts, setAccounts] = useState([]); // State to store account data
  const { loading } = useSelector((state) => state.user); // Get loading state from Redux

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-danger';
      case 'secretary':
        return 'bg-warning';
      case 'technician':
        return 'bg-success';
      case 'customer':
        return 'bg-secondary';
      default:
        return 'bg-secondary'; // Default to a color for unknown roles
    }
  };

  const fetchAccounts = () => {
    fetch('/backend/user/all') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error('Error fetching accounts:', error));
  };

  useEffect(() => {
    fetchAccounts(); // Fetch accounts when the component mounts
  }, []);
  
  
  const handleViewProfile = (accountId) => {
    window.location.href = `/account-management/${accountId}`;
  };

  return (
    <>
      <Preloader />
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <DashboardSidebar toggleSidebar={toggleSidebar} />

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Account Management</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active">Account Management</li>
            </ol>
          </nav>
        </div>

        <div className="btn-header">
          <button type="button" className="btn btn-primary-dashboard btn-lg rounded-pill" data-bs-toggle="modal" data-bs-target="#addModal">Add Account</button>
        </div>

        <AddAccount />

        <br />

        <section className="section dashboard">
          <div className="row">
            <AccountStat />

            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">User Accounts</h5>
                  {loading ? ( // Display a loading message while loading
                    <p>Loading accounts...</p>
                  ) : (
                    <div className="table-responsive-md">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Account ID</th>
                            <th scope="col">Role</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Created On</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(accounts) && accounts.length > 0 ? (
                            accounts.map((account) => (
                              <tr key={account._id}>
                                <th scope="row">{account._id}</th>
                                <td>
                                  <span className={`badge rounded-pill ${getRoleBadgeColor(account.role)}`}>{account.role}</span>
                                </td>
                                <td>{account.firstName} {account.lastName}</td>
                                <td>{account.email}</td>
                                <td>{account.createdAt}</td>
                                <td>
                                <button
                                    type="button"
                                    className="btn btn-primary-dashboard-action btn-sm"
                                    onClick={() => handleViewProfile(account._id)}
                                >
                                    View
                                </button>

                                  <button type="button" className="btn btn-secondary-dashboard-action btn-sm">Delete</button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6">No accounts found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
    </>
  );
}
