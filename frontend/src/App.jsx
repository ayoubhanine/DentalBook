import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Appointments from "./pages/admin/Appointments";
import Services from "./pages/admin/Services";
function App() {
  
  return (
    <>
   <Routes >
    <Route path="/" element={<Login/>}/>
    <Route path="/login" element={<Login/>}/>
     <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/admin/appointments" element={<Appointments />}/> 
        <Route path="/admin/services" element={<Services/>}/>
          </Route>
   </Routes>
    </>
  )
}

export default App
