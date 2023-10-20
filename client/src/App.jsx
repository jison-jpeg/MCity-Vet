import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
// import BookAppointment from './pages/Appointment/BookAppointment';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';

export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />     
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/appointments" element={<Appointments />} />
        {/* <Route path="/book-appointment" element={<BookAppointment />} /> */}
        
      </Routes>
    </BrowserRouter>
    
  );
}
