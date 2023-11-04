import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  // Check if the token has expired
  if (currentUser) {
    const tokenExpiration = new Date(currentUser.expiryDate);
    const currentTime = new Date();

    if (tokenExpiration <= currentTime) {
      // Token has expired; redirect to sign-in page
      return <Navigate to="/signin" />;
    }
  }
  
  // Check if the user is a customer and is trying to access the /inventory route
  const isCustomer = currentUser && currentUser.role === 'customer';
  const isInventoryRoute = window.location.pathname === '/inventory';

  // Handle role-based redirection
  if (isCustomer && isInventoryRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}
