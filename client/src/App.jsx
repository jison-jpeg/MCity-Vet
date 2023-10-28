import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Inventory from './pages/Inventory';
import MedicalRecord from './pages/MedicalRecord';
import Profile from './pages/Profile';
import AccountManagement from './pages/AccountManagement';
import SystemLogs from './pages/SystemLogs';
import BookAppointment from './pages/BookAppointment';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './pages/UserDashboard';


export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
    
        <Route element={<PrivateRoute />} > 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/medical-record" element={<MedicalRecord />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account-management" element={<AccountManagement />} />
          <Route path="/system-logs" element={<SystemLogs />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    
  );
}
