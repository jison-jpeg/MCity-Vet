import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Inventory from './pages/Inventory';
import MedicalRecord from './pages/MedicalRecord';
import AccountManagement from './pages/AccountManagement';
import SystemLogs from './pages/SystemLogs';

export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />     
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/medical-record" element={<MedicalRecord />} />
        <Route path="/account-management" element={<AccountManagement />} />
        <Route path="/system-logs" element={<SystemLogs />} />
        {/* <Route path="/book-appointment" element={<BookAppointment />} /> */}
        
      </Routes>
    </BrowserRouter>
    
  );
}
