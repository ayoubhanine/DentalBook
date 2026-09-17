import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Appointments from "./pages/admin/Appointments";
import Services from "./pages/admin/Services";
import Schedules from "./pages/admin/Schedules";
import Patients from "./pages/admin/Patients";
import PatientLayout from "./layouts/PatientLayout";
import PatientDashboard from "./pages/patient/Dashboard"
import BookAppointment from "./pages/patient/BookAppointment";
import PatientAppointments from "./pages/patient/Appointments";
import Profile from "./pages/patient/Profile";
function App() {
  
  return (
    <>
   <Routes >
    <Route path="/" element={<Login/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
     <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/admin/appointments" element={<Appointments />}/> 
        <Route path="/admin/services" element={<Services/>}/>
        <Route path="/admin/schedules" element={<Schedules/>}/>
        <Route path="/admin/patients" element={<Patients />} />
          </Route>
       <Route path="/patient" element={<PatientLayout />}>
        <Route path="dashboard" element={<PatientDashboard />}/>
          <Route path="book" element={<BookAppointment />}/>
          <Route path="appointments" element={<PatientAppointments />}/>
           <Route path="profile" element={<Profile />}/>
      </Route>
   </Routes>
    </>
  )
}

export default App
