import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    // If the user is not logged in, redirect to the sign-in page
    return <Navigate to="/signin" />;
  }

  // Check if the token has expired
  const tokenExpiration = new Date(currentUser.expiryDate);
  const currentTime = new Date();

  if (tokenExpiration <= currentTime) {
    // Token has expired; redirect to sign-in page
    return <Navigate to="/signin" />;
  }

  // Define allowed roles for specific routes
  const allowedRoles = {
    '/dashboard': ['admin', 'customer', 'technician', 'secretary'],
    '/appointments': ['admin', 'customer', 'technician', 'secretary'],
    '/inventory': ['admin'],
    '/medical-record': ['admin', 'customer', 'technician', 'secretary'],
    '/profile': ['admin', 'customer', 'technician', 'secretary'],
    '/account-management': ['admin'],
    '/system-logs': ['admin'],
  };

  // Get the current route's path
  const currentPath = window.location.pathname;

  // Check if the user's role is allowed for the current route
  if (allowedRoles[currentPath] && !allowedRoles[currentPath].includes(currentUser.role)) {
    // Redirect to an unauthorized page or handle it as needed
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}
