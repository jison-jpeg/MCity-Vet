import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';


export default function DashboardHeader({ toggleSidebar }) {
  const { currentUser } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/backend/notification/${currentUser._id}/notifications`);
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          console.error('Failed to fetch notifications:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [currentUser._id]);

  const handleNotificationClick = async (notificationId) => {
    try {
      // Add an API call to mark the notification as read
      await fetch(`/backend/notification/mark-as-read/${notificationId}`, {
        method: 'PUT',
        // Add any necessary headers or authentication tokens
      });

      // Update the state to reset the notification count
      setNotifications([]);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };


  const handleSignout = async () => {
    try {
      dispatch(signout());
      await fetch('/backend/auth/signout');
    } catch (error) {
      console.log(error);
    }
  };

  // Helper function to get notification icon based on type
const getNotificationIcon = (type) => {
  switch (type) {
    case 'info':
      return 'bi-info-circle text-primary';
    case 'warning':
      return 'bi-exclamation-circle text-warning';
    case 'success':
      return 'bi-check-circle text-success';
    case 'error':
      return 'bi-x-circle text-danger';
    default:
      return 'bi-info-circle text-primary';
  }
};

// Helper function to get notification color based on type
const getNotificationColor = (type) => {
  switch (type) {
    case 'info':
      return 'text-primary';
    case 'warning':
      return 'text-warning';
    case 'success':
      return 'text-success';
    case 'error':
      return 'text-danger';
    default:
      return 'text-primary';
  }
};


  return (
    <>
      {/* ======= Header ======= */}
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="/dashboard" className="logo d-flex align-items-center">
            <img src="/assets/images/logo-mc.png" alt="" className="d-none d-xl-block" />
            <span className="d-none d-xl-block">MCity Vet</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar} />
        </div>
        {/* End Logo */}
        <div className="search-bar">
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search" />
            </button>
          </form>
        </div>
        {/* End Search Bar */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search" />
              </a>
            </li>
            {/* End Search Icon*/}
            <li className="nav-item dropdown">
              <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell-fill" />
                <span className="badge bg-primary badge-number">{notifications.length}</span>
              </a>
              {/* End Notification Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li className="dropdown-header">
          You have {notifications.length} new notifications
          <a href="#">
            <span className="badge rounded-pill bg-primary p-2 ms-2">
              View all
            </span>
          </a>
        </li>
        {notifications.slice(0, 4).reverse().map((notification) => (
          <li key={notification._id} className="notification-item">
            <Link
              to={`/appointments/${notification.appointmentId}`}
              onClick={() => handleNotificationClick(notification._id)}
            >
              <i className={getNotificationIcon(notification.type)} />
            </Link>
            <div>
              <h4 className={getNotificationColor(notification.type)}>
                <Link
                  to={`/appointments/${notification.appointmentId}`}
                  onClick={() => handleNotificationClick(notification._id)}
                >
                  {notification.message}
                </Link>
              </h4>
              <p>{formatDate(notification.timestamp)}</p>
            </div>
          </li>
        ))}
        <li className="dropdown-footer">
          <a href="#">Show all notifications</a>
        </li>
      </ul>
              {/* End Notification Dropdown Items */}
            </li>
            {/* End Notification Nav */}

            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src={currentUser?.profilePicture}
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {currentUser?.firstName}
                </span>
              </a>
              {/* End Profile Iamge Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{currentUser?.firstName} {currentUser?.lastName}</h6>
                  <span>{currentUser?.role}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="/profile"
                  >
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                    onClick={handleSignout}
                  >
                    <i className="bi bi-box-arrow-left" />
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
              {/* End Profile Dropdown Items */}
            </li>
            {/* End Profile Nav */}
          </ul>
        </nav>
        {/* End Navbar */}
      </header>
      {/* End Header */}
    </>
  );
}

// Helper function to format date (you can use a library like date-fns for better formatting)
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
