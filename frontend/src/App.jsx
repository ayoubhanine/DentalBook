import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Appointments from "./pages/admin/Appointments";
function App() {
  
  return (
    <>
   <Routes >
    <Route path="/" element={<h1 className="text-amber-300 font-bold underline">DetalBook</h1>}/>
    <Route path="/login" element={<Login/>}/>
     <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/admin/appointments" element={<Appointments />}/> 
          </Route>
   </Routes>
    </>
  )
}

export default App
